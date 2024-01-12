const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const todo = [];
const app = express();

app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/todolist', (req, res) => {
  res.json(todo); // Send the entire 'todo' array as JSON
});

app.post('/add', (req, res) => {
  const inputValue = req.body.inputValue;
  todo.push(inputValue);
  res.json({ message: 'New task added', inputValue });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
