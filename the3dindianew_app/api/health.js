// Simple health endpoint (fallback) to verify serverless functions are deployed
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ success: true, message: 'Serverless function healthy', timestamp: new Date().toISOString() });
};
