import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/PrimeRewards/LP_Revamp/PC_Header_Banner._CB468631809_.jpg"
                    alt=""
                />
                <div>
                    <h3>Hello, Guest</h3>
                    <h2 className="checkout__title">Your Cart</h2>
                    <CheckoutProduct
                        id="1"
                        title="Product1"
                        image="img"
                        price="1212"
                        rating="3"
                    />
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;
