import React, { Component } from 'react';
import './ShoppingCartItem.css';


let totalCF = 0;
let totalPrice = 0;

export class ShoppingCartItem extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCount: 0, totalCF: 0, totalPrice: 0};
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
      }
    
    handleQuantityChange() {
        this.setState({
            totalCF: this.state.totalCF + (this.props.carbonfootprint * this.state.currentCount)
        });
        this.props.onQuantityChange(totalCF);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
        this.handleQuantityChange()
    }

    decrementCounter() {
        this.setState({            
            currentCount: this.state.currentCount - 1
        });
        this.handleQuantityChange()
    }

    

    render() {
      return (
        <div class="shoppingCartItemContainer">
          <img src={this.props.img} alt="" />
          <h2>Price: {this.props.price}</h2>
          <h4>Name: {this.props.name}</h4>
          <h4>Category: {this.props.category}</h4>
          <h4>CO2E: {this.props.carbonfootprint}</h4>
          <button className="btn btn-primary" onClick={this.incrementCounter}>+</button>
          <h4>Quantity: <strong>{this.state.currentCount}</strong></h4>
          <button className="btn btn-primary" onClick={this.decrementCounter}>-</button>
        </div>
      );
    }
  }