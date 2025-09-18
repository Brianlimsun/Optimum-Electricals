# Optimum Electricals Booking System

A React-based web application for booking electrician services with Google Sheets integration for data storage.

## Features

- **Lead Capture**: Collect customer name and phone number
- **Booking Form**: Comprehensive service request form with location details, problem description, and photo uploads
- **Payment Integration**: QR code payment with screenshot upload
- **Google Sheets Integration**: All booking data and photos are automatically saved to Google Sheets
- **Responsive Design**: Mobile-friendly interface
- **Real-time Validation**: Form validation with error handling

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Google Sheets Integration

#### Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Optimum Electricals Bookings"
3. Copy the Sheet ID from the URL

#### Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Copy the code from `google-apps-script.js`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
5. Deploy as a web app with "Anyone" access
6. Copy the webhook URL

#### Configure Environment
```bash
npm run setup-env
```
Then edit `.env` and add your webhook URL:
```env
VITE_APPS_SCRIPT_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run the Application
```bash
npm run dev
```

## Detailed Setup Guide

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for complete setup instructions.

## Data Structure

The system captures and stores the following data in Google Sheets:

| Field | Description |
|-------|-------------|
| Customer Information | Name, phone number |
| Location Details | Locality, landmark, full address |
| Service Details | Problem description, preferred time slot, booking date |
| Pricing | Locality fee, urgent fee, total amount |
| Media | Uploaded images, payment screenshot |
| Timestamps | Booking submission, payment confirmation |

## Locality Pricing

- **Rilbong**: ₹100
- **Police Bazaar**: ₹200
- **Laitumkhrah**: ₹200
- **Other**: ₹200
- **Same-day booking**: +₹100 urgent fee

## Deployment

### GitHub Pages
```bash
npm run deploy
```

### Environment Variables for Production
Make sure to set the `VITE_APPS_SCRIPT_WEBHOOK` environment variable in your deployment platform.

## File Structure

```
src/
├── pages/
│   ├── LeadCapture.tsx      # Initial customer information
│   ├── BookingForm.tsx      # Detailed booking form
│   └── PaymentConfirmation.tsx # Payment and confirmation
├── App.tsx                  # Main app component with routing
├── main.tsx                 # App entry point
└── index.css               # Custom styles

google-apps-script.js        # Google Apps Script webhook
GOOGLE_SHEETS_SETUP.md      # Detailed setup guide
```

## Troubleshooting

### Common Issues

1. **CORS Error**: Ensure your Google Apps Script is deployed with "Anyone" access
2. **Sheet Not Found**: Verify the Sheet ID in the Apps Script code
3. **Environment Variable**: Check that `VITE_APPS_SCRIPT_WEBHOOK` is properly set

### Testing

Use the browser's developer console to check for any errors during form submission.

## Support

For issues or questions, check the setup guide or review the Google Apps Script logs.
