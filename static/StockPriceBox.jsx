import React from 'react';
import ReactDOM from 'react-dom';
import StockPrice from './StockPrice.jsx';
import stockService from '../lib/stockService';

class StockPriceBox extends React.Component {

	constructor() {
		super();
		this.state = {
			email: '',
			stockPrices: {},
			emailStatusMessage: ''
		};

		// every two seconds, get all stock prices and update them
		setInterval(() => {
			this.props.stockTickers.map((stockTicker) => {
				stockService.getStockPrice(stockTicker).then((priceResponse) => {
	        this.updatePrice(stockTicker, priceResponse.price);
	      });
			})
    }, 2000);
	}

	updatePrice(stockTicker, price) {
		let currPrices = this.state.stockPrices;
		currPrices[stockTicker] = price;
		this.setState({stockPrices: currPrices});
	}

	sendPriceEmail() {
		stockService.sendStockPrices(this.state.email, this.state.stockPrices).then((response) => {
			let statusMessage = response.code === 200 ? 'Success!' : 'Invalid Email';
			this.setState({emailStatusMessage: statusMessage});
		});
	}

	emailInputChanged(event) {
		this.setState({email: event.target.value});
	}

	render() {
		let stockPrices = this.props.stockTickers.map((stockTicker) => {
			let props = {
				key: stockTicker,
				stockTicker: stockTicker,
				stockPrice: this.state.stockPrices[stockTicker],
				onPriceUpdate: this.updatePrice.bind(this)
			}

			return <StockPrice {...props} />;
		});

		return (
			<div className="stock-price-box">
				<h2>Stock Prices</h2>
				{stockPrices}
				<input type="text" placeholder="Your Email" onChange={this.emailInputChanged.bind(this)} value={this.state.email}/>
				<button type="button" onClick={this.sendPriceEmail.bind(this)}>Send Prices</button>
			</div>
		)
	}
}

export default StockPriceBox;

// More tickers can easily be added here, or through additional functionality
ReactDOM.render(<StockPriceBox stockTickers={["AAPL","GOOG", "ACN"]} />, document.getElementById('stock-prices'));
