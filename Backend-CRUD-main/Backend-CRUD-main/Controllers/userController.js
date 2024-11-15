const db = require('../config/db');

// Get all users
const getUsers = (req, res) => {
  db.query('SELECT * FROM users ORDER BY age DESC', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(result);
  });
};

// Get a user by ID
const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result[0]);  // Send back the first (and only) user object
  });
};

// Add a new user
const addUser = (req, res) => {
  const { prefix, firstName, lastName, age, gender, phone, email } = req.body;

  // Check if all required fields are present
  if (!prefix || !firstName || !lastName || !age || !gender || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate phone length
  if (phone.length > 15) {
    return res.status(400).json({ message: 'Phone number is too long. Max length is 15 characters.' });
  }

  // Add new user to database
  const query = `INSERT INTO users (prefix, firstName, lastName, age, gender, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [prefix, firstName, lastName, age, gender, phone, email], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User added!', user: req.body });
  });
};

// Delete a user by ID
const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted!' });
  });
};

// Update a user by ID
const updateUser = (req, res) => {
  const { id } = req.params;
  const { prefix, firstName, lastName, age, gender, phone, email } = req.body;

  if (!id || !prefix || !firstName || !lastName || !age || !gender || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields or ID' });
  }

  const query = `UPDATE users SET prefix = ?, firstName = ?, lastName = ?, age = ?, gender = ?, phone = ?, email = ? WHERE id = ?`;
  db.query(query, [prefix, firstName, lastName, age, gender, phone, email, id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated!', user: req.body });
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser
};
