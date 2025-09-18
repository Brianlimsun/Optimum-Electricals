# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Optimum Electricals Bookings"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit`
   - Sheet ID: `1ABC123DEF456GHI789JKL`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
5. Save the project and name it "Optimum Electricals Webhook"

## Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the Web App URL (this is your webhook URL)

## Step 4: Configure Environment Variables

1. Create a `.env` file in your project root:
```env
VITE_APPS_SCRIPT_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Replace `YOUR_SCRIPT_ID` with the actual script ID from your webhook URL

## Step 5: Test the Integration

1. Run your React app: `npm run dev`
2. Complete a test booking
3. Check your Google Sheet for the new entry

## Data Structure

The Google Sheet will contain the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the booking was submitted |
| Customer Name | Customer's full name |
| Phone Number | Customer's phone number |
| Locality | Selected locality (Rilbong, Police Bazaar, etc.) |
| Landmark | Optional landmark information |
| Full Address | Complete address |
| Problem Description | Description of the electrical issue |
| Preferred Time Slot | Selected time slot |
| Booking Date | Date of the booking |
| Is Urgent | Whether it's a same-day booking |
| Total Fee | Total amount charged |
| Payment Confirmed At | When payment was confirmed |
| Image Count | Number of images uploaded |
| Image Names | Names of uploaded images |
| Payment Screenshot Name | Name of payment screenshot |

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure your webhook URL is deployed with "Anyone" access
2. **Sheet Not Found**: Verify the Sheet ID is correct
3. **Permission Denied**: Ensure the Apps Script has permission to access the sheet

### Testing:

Use the `testSetup()` function in Apps Script to verify everything works:
1. Open Apps Script editor
2. Select `testSetup` function
3. Click "Run"
4. Check your Google Sheet for test data

## Security Notes

- The webhook URL is public, so anyone can send data to it
- Consider adding basic authentication if needed
- Monitor your Google Sheet for spam submissions
- Set up email notifications for new bookings if desired

