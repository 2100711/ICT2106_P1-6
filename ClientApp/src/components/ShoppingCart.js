import React, { useState } from "react";

const ShoppingCart = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Detergent", price: 1, carbonFootprint: 10, quantity: 0 },
        { id: 2, name: "Acid", price: 5, carbonFootprint: 5, quantity: 0 },
        { id: 3, name: "Degreaser", price: 20, carbonFootprint: 7, quantity: 0 },
    ]);
    const [discount, setDiscountCode] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0.0);
    const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(0);

    const handleDiscountChange = (e) => {
        setDiscountCode(e.target.value);
    };

    const handleQuantityChange = (id, e) => {
        const updatedProducts = products.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: e.target.value,
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const calculateTotals = () => {
        let newTotalPrice = 0;
        let newTotalCarbonFootprint = 0;

        products.forEach((product) => {
            newTotalPrice += product.price * product.quantity;
            newTotalCarbonFootprint += product.carbonFootprint * product.quantity;
        });

        setTotalPrice(newTotalPrice);
        setTotalCarbonFootprint(newTotalCarbonFootprint);
    };

    React.useEffect(() => {
        calculateTotals();
    }, [products]);

    React.useEffect(() => {
        if (totalPrice >= 10 && totalCarbonFootprint < 50 && products.length < 10) {
            setDiscountCode("DISCOUNT_10 promo code applied.");
            setDiscountedTotalPrice(totalPrice * 0.9);
        } else {
            setDiscountCode("No promo code available.");
            setDiscountedTotalPrice(totalPrice);
        }
    }, [discountedTotalPrice, totalCarbonFootprint, products.length]);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <table class="table table-light">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>($)Price</th>
                        <th>Carbon Footprint(CO2E)</th>
                        <th>Quantity</th>
                        <th>($)Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.carbonFootprint}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, e)}
                                />
                            </td>
                            <td>${product.price * product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>
                Total Price: ${totalPrice} - Total Carbon Footprint: {totalCarbonFootprint}{" "} kgCO2
                <br />
                <br />
                Discount: ${discountedTotalPrice.toFixed(2)} {discount}
            </p>
            <h2>Product Recommendation</h2>
        </div>
    );
};

export default ShoppingCart;
