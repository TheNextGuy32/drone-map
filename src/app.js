const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

app.use(express.static(path.resolve(`${__dirname}/../public`)));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
});

server.listen(Number(process.env.PORT || 5000));
console.log(`**************************`);
console.log(`* Listening on port ${process.env.PORT || 5000} *`);
console.log(`**************************`);