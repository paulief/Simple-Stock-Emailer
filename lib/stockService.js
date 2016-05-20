/**
Service to make http calls to retrieve the stock price from Yahoo
*/

const httpService = require('../lib/httpService');

const yahooPath = 'http://finance.yahoo.com/webservice/v1/symbols/';

const stockService = {
	// method to be called from the front end
	getStockPrice(symbol) {
		let url = `/stock_price?symbol=${symbol}`
		return httpService.get(url);
	},

	// method called from the server (Yahoo does not support CORS)
	getStockPriceFromApi(symbol) {
		let url = `${yahooPath}${symbol}/quote?format=json`
		return httpService.get(url);
	},

	getPriceFromResponse(response) {
		let price = parseFloat(response.list.resources[0].resource.fields.price);
		return `$ ${price.toFixed(2)}`;
	},

	sendStockPrices(email, prices) {
		return httpService.post('/email_prices', {
			email: email,
			prices: prices
		});
	}
};

module.exports = stockService;
