const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const USERS_FILE = path.join(__dirname, 'users.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Helper to load users from file
const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('--- Error Loading Registry ---', error.message);
  }
  return [];
};

// Helper to save users to file
const saveUsers = (usersToSave) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersToSave, null, 2), 'utf8');
  } catch (error) {
    console.error('--- Error Saving Registry ---', error.message);
  }
};

// Helper to load orders from file
const loadOrders = () => {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('--- Error Loading Orders ---', error.message);
  }
  return [];
};

// Helper to save orders to file
const saveOrders = (ordersToSave) => {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordersToSave, null, 2), 'utf8');
  } catch (error) {
    console.error('--- Error Saving Orders ---', error.message);
  }
};

let users = loadUsers();
let orders = loadOrders();

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173', 'http://127.0.0.1:5173', 
  'http://localhost:5174', 'http://127.0.0.1:5174',
  'http://localhost:5175', 'http://127.0.0.1:5175',
  'http://localhost:5176', 'http://127.0.0.1:5176',
  'http://localhost:5177', 'http://127.0.0.1:5177',
  'http://localhost:5178', 'http://127.0.0.1:5178',
  'http://localhost:5179', 'http://127.0.0.1:5179',
  'http://localhost:5200', 'http://127.0.0.1:5200'
];

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
      user = { 
        googleId: sub, 
        email, 
        name, 
        picture, 
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        authType: 'GOOGLE'
      };
      users.push(user);
    } else {
      user.lastLogin = new Date().toISOString();
      user.name = name; // Sync display name
      user.picture = picture; // Sync avatar
    }
    
    saveUsers(users); // Persist registry
    
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
  
  const newUser = { 
    email, 
    password, 
    name, 
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    authType: 'MANUAL'
  };
  users.push(newUser);
  saveUsers(users); // Persist registry
  
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

  user.lastLogin = new Date().toISOString();
  saveUsers(users); // Persist registry update
  
  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { name: user.name, email: user.email } });
});

// --- User Registry for Admin ---
app.get('/api/admin/users', (req, res) => {
  // Map to exclude passwords and sensitive internal IDs
  const userRegistry = users.map(u => ({
    name: u.name,
    email: u.email,
    authType: u.authType || 'MANUAL',
    createdAt: u.createdAt,
    lastLogin: u.lastLogin,
    picture: u.picture || null
  }));
  res.json({ success: true, users: userRegistry });
});

// --- Order Management ---

// 1. Fetch Orders (Public with Email filter or Admin all)
app.get('/api/orders', (req, res) => {
  const { email, isAdmin } = req.query;
  
  if (isAdmin === 'true') {
    return res.json({ success: true, orders });
  }

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email required for retrieval' });
  }

  const userOrders = orders.filter(o => o.email === email);
  res.json({ success: true, orders: userOrders });
});

// 2. Create Order (Checkout)
app.post('/api/orders', (req, res) => {
  console.log('--- Incoming Order Payload ---');
  console.log(JSON.stringify(req.body, null, 2));

  const { id, cx, email, items, total, date } = req.body;
  
  if (!id || !email) {
    return res.status(400).json({ success: false, message: 'Invalid order payload' });
  }

  const newOrder = {
    id,
    cx,
    email,
    items,
    total,
    date: date || new Date().toISOString().split('T')[0],
    packed: false,
    delivery: 'Pending'
  };

  orders.unshift(newOrder);
  saveOrders(orders);
  
  res.json({ success: true, order: newOrder });
});

// 3. Update Order Progress (Admin)
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;

  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: 'Order Not Found' });
  }

  orders[orderIndex] = { ...orders[orderIndex], [field]: value };
  saveOrders(orders);
  
  res.json({ success: true, order: orders[orderIndex] });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
