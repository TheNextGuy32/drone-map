const express = require('express');
const path = require('path');
const csv = require('csv');
const app = express();
const server = require('http').Server(app);

app.use(express.static(path.resolve(`${__dirname}/../public`)));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
});

app.get('/data', (req,res) => {

  require('fs').readFile(`./src/drone-data.csv`, (err, data) => {
    if(err) {
        return res.status(500).json(err);
    }
    csv.parse(data, (err, data) => {
      if(err) {
        return res.status(500).json(err);
      }
      res.status(200).json(data);
    });
  });
});

server.listen(Number(process.env.PORT || 5000));
console.log(`**************************`);
console.log(`* Listening on port ${process.env.PORT || 5000} *`);
console.log(`**************************`);