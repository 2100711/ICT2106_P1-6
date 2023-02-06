import React, { Component } from 'react';
import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';
import './Home.css';


  let products = [
    { img: "https://picsum.photos/200/300", price: 14, name: "Mama Lemon", category: "Detergent", carbonfootprint: 5},
    { img: "https://picsum.photos/200/300", price: 20, name: "No Grease", category: "Degreasers", carbonfootprint: 3},
    { img: "https://picsum.photos/200/300", price: 30, name: "Dirt Remover 9000", category: "Abrasives", carbonfootprint: 8},
  ];

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      totalCF: 0,
      totalPrice: 0,
      quantityOfItemsBought: 0
    };
  }



  
  handleQuantityChange = (cf, price, quantity) => {
      this.setState({
        totalCF: cf,
        totalPrice: price,
        quantityOfItemsBought: quantity
      });
      
  }


  render() {
    return (
      <>
        <div>
          <ul>
            {products.map((product) => (
              <ShoppingCartItem onQuantityChange={this.handleQuantityChange} img={product.img} price={product.price} name={product.name} category={product.category} carbonfootprint={product.carbonfootprint}/>
            ))}
            
          </ul>
        </div>

        <div>
            <h1>Total: {this.state.totalCF}</h1>
            <h2>Sub-Total: </h2>
        </div>
      </>
    );
  }
}
