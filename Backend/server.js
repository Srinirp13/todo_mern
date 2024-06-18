require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');
const filesRouter = require('./routes/files');


const app = express();
app.use(cors());
app.use(bodyParser.json());




app.use('/tasks', tasksRouter);
app.use('/files', filesRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
