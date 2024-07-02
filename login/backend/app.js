const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());

// Create a connection to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

// Connect to the database
con.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log("Connected to database!");
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle POST requests to /tasks
app.post('/tasks', function(req, res) {
  // Log the request body for debugging
  console.log('Request body:', req.body);

  // Destructure the request body
  const { id, name, label } = req.body;

  // Check if any required fields are missing
  if (!id || !name || !label) {
    return res.status(400).send('Missing required fields');
  }

  // SQL query to insert a new task
  const sql = "INSERT INTO tasks (id, name, label) VALUES (?, ?, ?)";

  // Execute the SQL query
  con.query(sql, [id, name, label], function(err, result) {
    if (err) {
      // Log the error details for debugging
      console.error('Error executing query:', err.stack);
      return res.status(500).send('Error executing query');
    }
    console.log('Task added successfully:', result);

    // Send a success response to the client
    res.status(201).json({ message: 'Task added successfully' });
  });
});
app.get('/tasks', function(req, res) {
  var sql = "SELECT * FROM tasks";
  con.query(sql, function(err, results) {
    if (err) {
      console.error('Lỗi khi thực thi truy vấn:', err.stack);
      res.status(500).send('Lỗi khi thực thi truy vấn');
      return;
    }
    res.json(results);
  });
});
// Start the server
app.listen(5000, function() {
  console.log('Server running at http://localhost:5000');
});
