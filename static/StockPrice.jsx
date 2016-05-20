import React from 'react';

class StockPrice extends React.Component {
  render() {
    return (
      <div className="stock-price-container pure-g">
        <div className="pure-u-1-2 stock-ticker">
          {this.props.stockTicker}
        </div>
        <div className="pure-u-1-2 stock-price">
          {this.props.stockPrice}
        </div>
      </div>
    );
  }
};

export default StockPrice;
