/**
Service to abstract away the http module in order to use promises
*/

const q = require('q');
const http = require('http');

const path = 'http://finance.yahoo.com/webservice/v1/symbols/';

function buildUrl(symbol) {
	return encodeURI(`${path}${symbol}/quote?format=json`)
}

function request(options, body) {
	let deferred = q.defer();
	let result = '';

	let req = http.request(options, (res) => {
		res.on('data', (chunk) => {
			result += chunk;
		});

		res.on('end', () => {
			deferred.resolve(JSON.parse(result));
		});
	});

	req.on('error', (err) => {
		deferred.reject(err.message);
	});

	if (body) {
		console.log('writing to body', body);
		req.write(body);
	}

	req.end();

	return deferred.promise;
}

const httpService = {
	get(url) {
		return request(url);
	},
	post(url, body) {
		let requestBody = JSON.stringify(body);

		let options = {
			method: 'POST',
			port: 3000,
			path: '/email_prices',
			headers: { 'Content-Type': 'application/json',
								 'Content-Length': Buffer.byteLength(requestBody) }
		};

		return request(options, requestBody);
	}
}

module.exports = httpService;
