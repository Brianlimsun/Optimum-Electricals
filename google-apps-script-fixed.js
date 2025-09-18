/**
 * Google Apps Script for Optimum Electricals Booking System - CORS Fixed Version
 * This script receives form data and saves it to Google Sheets
 */

// Configuration - Replace with your actual Google Sheet ID
const SHEET_ID = '1Av2TcNjB57hSUJNKsLpW9fkjmJKjaSxBoIC6s8z9WcY'; // Replace with your actual sheet ID
const SHEET_NAME = 'Bookings'; // Name of the sheet tab

/**
 * Main function to handle POST requests from the booking form
 */
function doPost(e) {
  try {
    console.log('doPost called with:', e);
    console.log('e type:', typeof e);
    console.log('e keys:', e ? Object.keys(e) : 'e is null/undefined');
    
    // Handle different ways data might be sent
    let data;
    
    if (e && e.postData && e.postData.contents) {
      // Standard POST data
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      // URL parameters (fallback)
      data = e.parameter;
    } else if (e && e.postData && e.postData.parameters) {
      // Form data
      data = e.postData.parameters;
    } else {
      console.error('No data received in any format:', e);
      return createResponse({
        success: false,
        error: 'No data received',
        received: e,
        timestamp: new Date().toISOString()
      });
    }
    
    // Log the received data for debugging
    console.log('Received booking data:', data);
    
    // Save images to Google Drive and get links
    let imageLinks = [];
    if (data.images && data.images.length > 0) {
      console.log('Saving images to Google Drive...');
      imageLinks = saveImagesToDrive(data.images, data.customerName, data.customerPhone);
      console.log('Image links:', imageLinks);
    }
    
    // Save payment screenshot to Google Drive
    let paymentScreenshotLink = '';
    if (data.paymentScreenshot && data.paymentScreenshot.data) {
      console.log('Saving payment screenshot to Google Drive...');
      const paymentScreenshotLinks = saveImagesToDrive([data.paymentScreenshot], data.customerName, data.customerPhone);
      if (paymentScreenshotLinks.length > 0) {
        paymentScreenshotLink = paymentScreenshotLinks[0];
        console.log('Payment screenshot link:', paymentScreenshotLink);
      }
    }
    
    // Get or create the Google Sheet
    const sheet = getOrCreateSheet();
    
    // Prepare the row data
    const rowData = prepareRowData(data);
    
    // Add image links to the row data
    if (imageLinks.length > 0) {
      rowData.push(imageLinks.join(', '));
    } else {
      rowData.push('');
    }
    
    // Add payment screenshot link to the row data
    rowData.push(paymentScreenshotLink);
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data saved to sheet successfully');
    
    // Return success response
    return createResponse({
      success: true,
      message: 'Booking saved successfully',
      timestamp: new Date().toISOString()
    });
      
  } catch (error) {
    console.error('Error processing booking:', error);
    console.error('Error details:', error.toString());
    console.error('Error stack:', error.stack);
    
    // Return error response
    return createResponse({
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Create a response with proper CORS headers
 */
function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the Google Sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      'Customer Name',
      'Phone Number',
      'Locality',
      'Landmark',
      'Full Address',
      'Problem Description',
      'Preferred Time Slot',
      'Booking Date',
      'Is Urgent',
      'Total Fee',
      'Payment Confirmed At',
      'Image Count',
      'Image Names',
      'Payment Screenshot Name',
      'Image Links',
      'Payment Screenshot Link'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f0f0f0');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
  }
  
  return sheet;
}

/**
 * Prepare row data for insertion into the sheet
 */
function prepareRowData(data) {
  const timestamp = data.timestamp || new Date().toISOString();
  const paymentConfirmedAt = data.paymentConfirmedAt || '';
  
  // Count images
  const imageCount = data.images ? data.images.length : 0;
  const imageNames = data.images ? data.images.map(img => img.name).join(', ') : '';
  
  // Payment screenshot info
  const paymentScreenshotName = data.paymentScreenshot ? data.paymentScreenshot.name : '';
  
  return [
    timestamp,
    data.customerName || '',
    data.customerPhone || '',
    data.locality || '',
    data.landmark || '',
    data.fullAddress || '',
    data.problemDescription || '',
    data.preferredTimeSlot || '',
    data.bookingDate || '',
    data.isUrgent ? 'Yes' : 'No',
    data.totalFee || 0,
    paymentConfirmedAt,
    imageCount,
    imageNames,
    paymentScreenshotName
  ];
}

/**
 * Save images to Google Drive and return file links
 */
function saveImagesToDrive(images, customerName, customerPhone) {
  if (!images || images.length === 0) return [];
  
  const folderName = `Optimum Electricals Bookings/${customerName}_${customerPhone}`;
  let folder;
  
  try {
    // Try to get existing folder
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      // Create new folder
      folder = DriveApp.createFolder(folderName);
    }
  } catch (error) {
    console.error('Error creating folder:', error);
    return [];
  }
  
  const fileLinks = [];
  
  images.forEach((image, index) => {
    try {
      // Check if image data is valid
      if (!image.data || typeof image.data !== 'string') {
        console.error(`Image ${index + 1} has invalid data:`, image);
        return;
      }
      
      // Convert base64 to blob
      const base64Data = image.data.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Validate base64 data
      if (!base64Data || base64Data.length === 0) {
        console.error(`Image ${index + 1} has empty base64 data`);
        return;
      }
      
      // Try to decode base64
      let decodedData;
      try {
        decodedData = Utilities.base64Decode(base64Data);
      } catch (decodeError) {
        console.error(`Image ${index + 1} base64 decode error:`, decodeError);
        return;
      }
      
      const blob = Utilities.newBlob(decodedData, 'image/jpeg', image.name);
      
      // Save to Drive
      const file = folder.createFile(blob);
      
      // Make file publicly viewable
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      // Get file link
      const fileLink = file.getUrl();
      fileLinks.push(fileLink);
      
      console.log(`Image ${index + 1} saved: ${fileLink}`);
    } catch (error) {
      console.error(`Error saving image ${index + 1}:`, error);
    }
  });
  
  return fileLinks;
}

/**
 * Function to handle GET requests (for testing)
 */
function doGet(e) {
  return createResponse({
    message: 'Optimum Electricals Booking API is running',
    timestamp: new Date().toISOString(),
    method: 'GET'
  });
}

/**
 * Test function to verify the setup
 */
function testSetup() {
  const testData = {
    customerName: 'Test Customer',
    customerPhone: '9876543210',
    locality: 'Rilbong',
    landmark: 'Near Test Mall',
    fullAddress: '123 Test Street, Test Area',
    problemDescription: 'Test electrical issue',
    preferredTimeSlot: '10:00-12:00',
    bookingDate: '2024-01-15',
    isUrgent: false,
    totalFee: 100,
    images: [
      { name: 'test-image-1.jpg', data: 'base64data...' }
    ],
    timestamp: new Date().toISOString()
  };
  
  try {
    const sheet = getOrCreateSheet();
    const rowData = prepareRowData(testData);
    sheet.appendRow(rowData);
    console.log('Test data inserted successfully');
    return 'Test completed successfully';
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

/**
 * Test function to simulate a POST request
 */
function testPost() {
  const testEvent = {
    postData: {
      contents: JSON.stringify({
        customerName: 'Test Customer',
        customerPhone: '9876543210',
        locality: 'Rilbong',
        landmark: 'Near Test Mall',
        fullAddress: '123 Test Street, Test Area',
        problemDescription: 'Test electrical issue',
        preferredTimeSlot: '10:00-12:00',
        bookingDate: '2024-01-15',
        isUrgent: false,
        totalFee: 100,
        images: [
          { 
            name: 'test-image-1.jpg', 
            data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' 
          }
        ],
        paymentScreenshot: {
          name: 'payment-screenshot.jpg',
          data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        },
        timestamp: new Date().toISOString()
      })
    }
  };
  
  return doPost(testEvent);
}
