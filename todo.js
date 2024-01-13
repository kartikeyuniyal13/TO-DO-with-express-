const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const filePath = 'Data.json';



function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}
app.get('/todolist', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const list = data ? JSON.parse(data) : [];
      //The res.json() method is typically used in web development with Node.js and Express to send a JSON response from the server to the client.
      res.json(list);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.get('/findlist/:id', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading Data.json:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      try {
        const list = data ? JSON.parse(data) : [];
        const idlist=findIndex(list,parseInt(req.params.id))
         if(idlist==-1){
          res.status(404).json()
         }
        res.json(list[idlist]);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  });


let id=0;

app.post('/add', (req, res) => {
  const entry = {
    id:id++,

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
      //status(404): This method is used to set the HTTP status code of the response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
