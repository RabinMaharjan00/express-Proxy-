'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');


const PORT = process.env.PORT || 3000;
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  // Point static path to dist
app.use(express.static(path.join(__dirname, '/../dist/CryptoStation')));
  
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist/CryptoStation/index.html'));
  });
app.set('port', PORT);  
const server = http.createServer(app);

server.listen(PORT, () => console.log(`API running on localhost:${PORT}`));