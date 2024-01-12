const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const filePath = 'Data.json';

app.get('/todolist', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const list = data ? JSON.parse(data) : [];
      res.json(list);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.post('/add', (req, res) => {
  const entry = {
    title: req.body.inputValue,
  };

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const list = data ? JSON.parse(data) : [];
      list.push(entry);

      fs.writeFile(filePath, JSON.stringify(list), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to Data.json:', writeErr);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.status(201).json(entry);
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
