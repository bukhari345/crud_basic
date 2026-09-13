// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   // change to your MySQL password
  database: 'crud'    // change to your database name
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// CREATE - add a new user
app.post('/users', (req, res) => {
  const { id, name, email, age, city } = req.body;
  const sql = 'INSERT INTO users (id, name, email, age, city) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [id, name, email, age, city], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', id: id || result.insertId });
  });
});

// READ - get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ - get a single user by id
app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
});

// UPDATE - modify a user by id
app.put('/users/:id', (req, res) => {
  const { name, email, age, city } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, age = ?, city = ? WHERE id = ?';
  db.query(sql, [name, email, age, city, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  });
});

// DELETE - remove a user by id
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));