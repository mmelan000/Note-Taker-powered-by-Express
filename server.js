const express = require('express');
const path = require('path');
const { readFromFile, writeToFile, readAndAppend, readAndDelete } = require('./helpers/fsutil')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);
// GET route for notes API
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes database.`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// POST Route for adding new notes.
tips.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
