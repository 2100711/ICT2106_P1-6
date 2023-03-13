import React, { Component } from 'react';
import { Table, Button } from "reactstrap";

export class Recommender extends Component {

    constructor(props) {
        super(props);

        this.state = {
        loading: true,
        };
    }

    componentDidMount() {
        this.fetchRecommendationsDegreaser();
        this.fetchRecommendationsDetergent();
    }

    async fetchRecommendationsDegreaser() {
        const response = await fetch('/api/recommender/degreaser');
        const data = await response.json();
        this.setState({recommendationDegreaser: data.products, loading: false});
        console.log(data);
    }

    async fetchRecommendationsDetergent() {
        const response = await fetch('/api/recommender/detergent');
        const data = await response.json();
        this.setState({recommendationDetergent: data.products, loading: false});
        console.log(data);
    }

    renderData() {
        const shoppingCart = [
            {id: "1", name: "All-Purpose Heavy Duty Degreaser", carbonFootprint: "50", quantity: 1, price: 10, total: 10},
            {id: "2", name: "Multi Surface Cleaner - Citrus Fresh", carbonFootprint: "100", quantity: 1, price: 10, total: 10},
        ];

        const array_label = ["Name", "Brand", "Carbon Footprint","Price($)"];

        return (
            <div>
            <h2>Shopping Cart</h2>
            <table class="table table-light">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price($)</th>
                        <th>CF</th>
                        <th>Quantity</th>
                        <th>Total($)</th>
                    </tr>
                </thead>
                <tbody>
                    {shoppingCart.map((product, key) => (
                        <tr>
                            <td key={key}>{product.name}</td>
                            <td key={key}>{product.price}</td>
                            <td key={key}>{product.carbonFootprint}</td>
                            <td key={key}>{product.quantity}</td>
                            <td key={key}>{product.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr></hr>
            <h2>Product Recommendations for Lowest Carbon Footprint</h2>
            <div>
                <h3>Degreaser</h3>
                <Table>
                <thead>
                    <tr>
                    {array_label.map((data, key) => {
                        return <th key={key}>{data}</th>;
                    })}
                    </tr>
                </thead>
                <tbody>
                    {this.state.recommendationDegreaser.map((data, key) => {
                    return (
                        <tr key={key}>
                            <td key={key}>{data.name}</td>
                            <td key={key}>{data.brand}</td>
                            <td key={key}>{data.stock}</td>
                            <td key={key}>{data.price}</td>
                            <td>
                                <Button color="primary" type="submit">
                                    Add to Cart
                                </Button>
                            </td>
                        </tr>
                    );
                    })}
                </tbody>
                </Table>
            </div>
            <div>
                <h3>Detergent</h3>
                <Table>
                <thead>
                    <tr>
                    {array_label.map((data, key) => {
                        return <th key={key}>{data}</th>;
                    })}
                    </tr>
                </thead>
                <tbody>
                {this.state.recommendationDetergent?.map((data, key) => {
                    return (
                        <tr key={key}>
                            <td key={key}>{data.name}</td>
                            <td key={key}>{data.brand}</td>
                            <td key={key}>{data.stock}</td>
                            <td key={key}>{data.price}</td>
                            <td>
                                <Button color="primary" type="submit">
                                    Add to Cart
                                </Button>
                            </td>
                        </tr>
                    );
                    })}
                </tbody>
                </Table>
                </div>
                <div>
                <h3></h3>
                <Table>
                <thead>
                    <tr>
                    {/* {array_label.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                    })} */}
                    </tr>
                </thead>
                <tbody>
                    {/* {array_acid.map((prop, key) => {
                    return (
                        <tr key={key}>
                            {prop.map((prop, key) => {
                                return <td key={key}>{prop}</td>;
                            })}
                            <td>
                                <Button color="primary" type="submit">
                                    Add to Cart
                                </Button>
                            </td>
                        </tr>
                    );
                    })} */}
                </tbody>
                </Table>
                </div>
                <div>
                <h3></h3>
                <Table>
                <thead>
                    <tr>
                    {/* {array_label.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                    })} */}
                    </tr>
                </thead>
                <tbody>
                    {/* {array_abrasives.map((prop, key) => {
                    return (
                        <tr key={key}>
                            {prop.map((prop, key) => {
                                return <td key={key}>{prop}</td>;
                            })}
                            <td>
                                <Button color="primary" type="submit">
                                    Add to Cart
                                </Button>
                            </td>
                        </tr>
                    );
                    })} */}
                </tbody>
                </Table>
            </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          this.renderData()
        );

        return (
          <div>
            {contents}
          </div>
        );
    }
}