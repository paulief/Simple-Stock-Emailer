const q = require('q');
const nodemailer = require('nodemailer');
const validator = require('validator');

// setting up mailer to point to Mailtrap.io account
const transport = nodemailer.createTransport('SMTP', {
  host: 'mailtrap.io',
  port: 2525,
  auth: {
    user: '038b5b4f29d900',
    pass: '46e94f51f62519'
  }
});

const defaultOptions = {
  from: 'stock_prices@test.com',
  subject: 'Current Stock Prices'
};

function mergeOptions(email, prices) {
	return Object.assign({}, defaultOptions, {
		to: email,
		text: buildEmailText(prices),
		html: buildEmailHtml(prices)
	});
}

function buildEmailText(prices) {
	let priceTexts = Object.keys(prices).map((symbol) => {
		return `Symbol: ${symbol} Price: ${prices[symbol]}`;
	});

	return priceTexts.join("\n");
}

function buildEmailHtml(prices) {
	let priceElements = Object.keys(prices).map((symbol) => {
		return `<h5>Symbol: ${symbol}</h5><h5>Price: ${prices[symbol]}</h5>`;
	});

	return priceElements.join('<br/>');
}

const emailService = {
	sendPriceEmail(email, prices) {
		let deferred = q.defer();

		// prices come in in the form { SYMBOL: price }
		transport.sendMail(mergeOptions(email, prices), (err, info) => {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	},

	isValidEmail(email) {
		return validator.isEmail(email);
	}
};

module.exports = emailService;
