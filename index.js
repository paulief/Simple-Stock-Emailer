"use strict";

const stockService = require('./lib/stockService');
const emailService = require('./lib/emailService');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Run server to listen on port 3000.
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

// Set Express routes.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// route for front-end to request stock price
app.get('/stock_price', (req, res) => {
  let symbol = req.query.symbol;

  stockService.getStockPriceFromApi(symbol).then((response) => {
    res.send({ price: stockService.getPriceFromResponse(response) });
  });
});

app.post('/email_prices', (req, res) => {
  let email = req.body.email;
  let prices = req.body.prices;

  if (emailService.isValidEmail(email)) {
    emailService.sendPriceEmail(email, prices).then(() => {
      res.send({ code: 200 });
    });
  } else {
    // non valid email
    res.send({ code: 400 });
  }
});
