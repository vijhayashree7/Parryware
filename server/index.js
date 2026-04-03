const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('CORS Not Allowed'));
  },
  credentials: true
}));
app.use(express.json());

// --- Debugging Middleware ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
const users = [];

// --- Health Check ---
app.get('/api/health', (req, res) => {
  console.log(`[HEARTBEAT] Protocol Check at ${new Date().toLocaleTimeString()}`);
  res.json({ status: 'online', timestamp: new Date() });
});

// --- Google Auth ---
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential, audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { sub, email, name, picture } = ticket.getPayload();
    
    let user = users.find(u => u.email === email);
    if (!user) {
      user = { googleId: sub, email, name, picture, createdAt: new Date() };
      users.push(user);
    }
    
    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, picture: user.picture } });
  } catch (error) {
    console.error('--- Google Auth Error ---');
    console.error(error.message || error);
    res.status(401).json({ success: false, message: 'Google Auth Failed: Use valid token' });
  }
});

// --- Manual Register ---
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  
  const newUser = { email, password, name, createdAt: new Date() };
  users.push(newUser);
  
  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { name, email } });
});

// --- Manual Login ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { name: user.name, email: user.email } });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
