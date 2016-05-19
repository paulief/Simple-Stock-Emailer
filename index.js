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
    res.send(stockService.getPriceFromResponse(response));
  });
});

app.post('/events', (req, res) => {
  let to = req.body.To;
  let fromNumber = req.body.From;
  let callStatus = req.body.CallStatus;
  let callSid = req.body.CallSid;

  io.emit('call progress event', { to, fromNumber, callStatus, callSid });

  console.log(to, fromNumber, callStatus, callSid);
  res.send('Event received');
});

app.post('/email_prices', (req, res) => {
  let email = req.body.email;
  let prices = req.body.prices;

  emailService.sendPriceEmail(email, prices).then(() => {
    console.log('email success');
  });
});

// emailService.sendPriceEmail('paul@test.com', [
//   {symbol: 'AAPL', price: 100},
//   {symbol: 'GOOG', price: 2121}
// ]).then(() => {
//   console.log('email sent');
// });
