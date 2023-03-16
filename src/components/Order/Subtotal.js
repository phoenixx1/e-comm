import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

function Subtotal() {
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal 0 items: <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value="1212"
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />

            <button onClick={(e) => history.push("/payment")}>
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Subtotal;
