const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up The3DIndia Backend...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('⚠️  Please edit .env file with your email credentials\n');
  } else {
    // Create basic .env file
    const envContent = `# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=admin@the3dindia.com

# Server Configuration
PORT=5000
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created basic .env file');
    console.log('⚠️  Please edit .env file with your email credentials\n');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory already exists');
}

// Create submissions.json if it doesn't exist
const submissionsFile = path.join(__dirname, 'submissions.json');
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, '[]');
  console.log('✅ Created submissions.json file');
} else {
  console.log('✅ Submissions file already exists');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Edit .env file with your Gmail credentials');
console.log('2. Run: npm start');
console.log(`3. Open: http://localhost:${process.env.PORT || 5000}/admin`);
console.log('4. Test contact form at: http://localhost:5173/contact (Vite dev server)');

console.log('\n📧 Gmail Setup Instructions:');
console.log('1. Enable 2-Factor Authentication on Gmail');
console.log('2. Go to: Google Account → Security → App passwords');
console.log('3. Generate app password for "Mail"');
console.log('4. Use that password in .env file (not your regular password)');