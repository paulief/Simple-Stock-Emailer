import React from 'react';

class StockPrice extends React.Component {
  render() {
    return (
      <div className="stock-price-container">
        <h3>Stock Ticker: {this.props.stockTicker}</h3>
        <h4 className="stock-price">
          Stock Price: {this.props.stockPrice}
        </h4>
      </div>
    );
  }
};

export default StockPrice;
