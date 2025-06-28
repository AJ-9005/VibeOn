const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
app.use(express.static('public'));
const folder = 'public/songs/';
const songs = fs.readdirSync(folder).sort();
const musicname = songs.map(song => path.parse(song).name);
app.get('/songs', (req, res) => {
  res.json(musicname);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
