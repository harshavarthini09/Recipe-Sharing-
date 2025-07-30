// server.js (in backend folder)

// Import required modules
const express = require('express');
const mysql = require('mysql2');  
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());  // Allows frontend to connect
app.use(bodyParser.json());  // Parses JSON requests

// Connect to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'Harshini@28',  // Replace with your MySQL password
  database: 'recipe'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});



// // API: Get all recipes
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// // API: Search recipes by title
app.get('/recipes/search', (req, res) => {
  const searchTerm = req.query.term;
  db.query('SELECT * FROM menu WHERE title LIKE ?', [`%${searchTerm}%`], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API: Upload a new recipe
app.post('/recipes', (req, res) => {
  const { title, ingredients, instructions } = req.body;
  db.query('INSERT INTO menu (title, ingredients, instructions) VALUES (?, ?, ?)', [title, ingredients, instructions], (err) => {
    if (err) throw err;
    res.send('Recipe added!');
  });
});

// API: Add a rating to a recipe
app.post('/ratings', (req, res) => {
  const { recipe_id, rating } = req.body;
  db.query('INSERT INTO ratings (recipe_id, rating) VALUES (?, ?)', [recipe_id, rating], (err) => {
    if (err) throw err;
    res.send('Rating added!');
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});