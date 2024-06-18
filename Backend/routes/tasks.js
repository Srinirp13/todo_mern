const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect(err => {
    if (err) throw err;
    console.log("MySql connected");
});


router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


router.post('/tasks', (req, res) => {
    const { title, description } = req.body; 
  
    if (!title || !description) {
      return res.status(400).json({ error: 'Both title and description are required' });
    }
  
    db.query('INSERT INTO tasks (title, description, completed) VALUES (?, ?, false)', [title, description], (err, result) => {
      if (err) {
        console.error('Error inserting task:', err);
        return res.status(500).json({ error: 'Failed to add task' });
      }
      res.status(201).send('Task added successfully');
    });
  });



router.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;
  
    db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, taskId], (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Failed to update task' });
      }
      res.send('Task updated successfully');
    });
  });


router.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
  
    db.query('DELETE FROM tasks WHERE id = ?', taskId, (err, result) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ error: 'Failed to delete task' });
      }
      res.send('Task deleted successfully');
    });
  });
  


module.exports = router;


