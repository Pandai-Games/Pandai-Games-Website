const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');

app.use(express.json());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Placeholder for user wallet
let userWallet = { balance: 0 };

// In-memory storage for email subscriptions (in production, use a database)
let emailSubscriptions = new Set();

app.get('/api/wallet', (req, res) => {
  res.json(userWallet);
});

app.post('/api/purchase', (req, res) => {
  // Simulate purchase logic
  const { amount } = req.body;
  userWallet.balance += amount;
  res.json({ success: true, balance: userWallet.balance });
});

// Email subscription endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  // Enhanced email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  // Check if email is already subscribed
  if (emailSubscriptions.has(email.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: 'This email is already subscribed to notifications'
    });
  }

  // Add email to subscriptions
  emailSubscriptions.add(email.toLowerCase());
  
  res.json({
    success: true,
    message: 'Successfully subscribed to game launch notifications!'
  });
});

// Serve index.html for any non-API route
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
