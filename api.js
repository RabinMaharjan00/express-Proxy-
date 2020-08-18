'use strict';
var express = require('express');
var requestify = require('requestify');


var PORT = process.env.PORT || 3000;
const APIKEY="350b868e-8a78-4113-8d01-1e3e719015f3";
const BASE_URL= "https://pro-api.coinmarketcap.com/v1/"
const API_OPTIONS = {
  params: {
    'start': '1',
    'limit': '5000',
    'convert':'USD'
  },
    headers: { 
        accept: 'application/json' ,
        'X-CMC_PRO_API_KEY': APIKEY
    }
  };
  var app = express.Router();
 

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


  app.get('/', (req, res) => {
    res.send('api works');
  });

  app.get('/cryptocurrency', function(req, res) {
    var URL = BASE_URL + '/cryptocurrency/listings/latest';
    requestify
      .get(URL, API_OPTIONS)
      .then(function(fbres) {
        res.json(JSON.parse(fbres['body']));
      })
      .catch(function(err) {
        res.json(err);
        // you should also probably set up some logging here.
      });
  });

  module.exports = app;