# The3DIndia Backend API

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your email credentials
```

### 3. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## 📧 Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   NOTIFICATION_EMAIL=where-to-receive-notifications@gmail.com
   ```

## 🔗 API Endpoints

### POST /api/contact
Submit contact form with files
- **Body:** FormData with name, email, mobile, service, message
- **Files:** Up to 5 files, 50MB each
- **Response:** Success/error message

### GET /api/submissions
Get all form submissions (admin)
- **Response:** Array of all submissions with metadata

### GET /api/health
Health check endpoint
- **Response:** Server status

## 📁 File Storage

- Files stored in `uploads/YYYY-MM-DD/` folders
- Original filenames preserved with timestamp prefix
- Supported formats: STL, OBJ, STEP, 3MF, IGES, JPG, PNG, PDF

## 📊 Data Storage

- Submissions stored in `submissions.json`
- Each submission includes:
  - Contact information
  - File metadata
  - Timestamp
  - Unique ID

## 🔒 Security Features

- File type validation
- File size limits (50MB)
- CORS enabled for frontend
- Email notifications
- Auto-reply to customers

### Admin access

The dashboard and its API require `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` to be set in the backend environment. Configure these in the deployment provider's secret settings; do not commit a populated `.env` file. The dashboard prompts for the credentials when opened, and the session token expires after eight hours. Customer JWTs use the same `JWT_SECRET`; production startup fails when it is missing.

The JSON files and uploaded files in this project are local filesystem storage. They are suitable only when the backend runs on a host with a persistent disk attached. Serverless and ephemeral container filesystems can lose or split data across instances. Before production use, attach durable storage or migrate these records and uploads to a database/object store.

## 📱 Frontend Integration

Update your Contact.tsx handleSubmit:
```javascript
const response = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  body: formDataToSend,
});
```

## 🛠️ Customization

- **Database:** Replace JSON storage with MongoDB/PostgreSQL
- **Cloud Storage:** Use AWS S3 for file uploads
- **Authentication:** Add admin login for submissions
- **Processing:** Add 3D file analysis/preview
- **Notifications:** Add SMS/Slack notifications
