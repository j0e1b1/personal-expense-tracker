const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.userId = user.id;
  res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

router.get('/session', (req, res) => {
  if (req.session.userId) {
    res.json({ authenticated: true, userId: req.session.userId });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
