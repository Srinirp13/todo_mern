const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const multer = require('multer');
const upload = multer();
require('dotenv').config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});



router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const query = 'INSERT INTO files (filename, filedata) VALUES (?, ?)';
  db.query(query, [file.originalname, file.buffer], (err) => {
    if (err) throw err;
    res.sendStatus(201);
  });
});



module.exports = router;
