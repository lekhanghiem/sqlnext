const express = require('express');
const mysql = require('mysql');
const app = express();

// Kết nối đến MySQL
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

// Kết nối tới MySQL
con.connect(function(err) {
  if (err) {
    console.error('Lỗi kết nối đến MySQL:', err.stack);
    return;
  }
  console.log('Đã kết nối đến cơ sở dữ liệu MySQL với ID là ' + con.threadId);
});

// Route để lấy danh sách các công việc từ cơ sở dữ liệu và trả về dưới dạng JSON
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
app.post('/tasks', function(req, res) {
  const { id, name, label } = req.body;
  const sql = "INSERT INTO tasks (id, name, label) VALUES (?, ?, ?)";
  con.query(sql, [id, name, label], function(err, result) {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(201).send('Task added successfully');
  });
});

// Cổng mặc định để lắng nghe
const port = 5000;
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
