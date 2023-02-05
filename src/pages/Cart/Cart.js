import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import CartImage from "../../assets/cart.jpg";
import "./cart.scss";

function Cart() {
  const { items, totalProductPrice, totalCheckoutPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <section id="my__cart">
      <h1>My Cart</h1>
      <div className="cart__items__container">
        <div className="cart__items">
          {items.length > 0 ? (
            items.map((item) => <CartItems item={item} key={item.id} />)
          ) : (
            <div className="cart__items__empty">
              <div className="cart_image">
                <img src={CartImage} alt="cart_image" width="100%" />
              </div>
              <h1 className="title">Your Cart is Empty</h1>
              <p className="subtitle">Looks like you have't made choice yet</p>
            </div>
          )}
        </div>
        <div className="cart__billing">
          <div className="cart__billing-body">
            <ul>
              <li className="cart__billing-item">
                <span className="cart__billing-title">Subtotal</span>
                <span className="cart__billing-price">
                  &#8377;{totalProductPrice}
                </span>
              </li>
              <li className="cart__billing-item">
                <span className="cart__billing-title">shipping</span>
                <span className="cart__billing-price">
                  {items.length === 0 ? (
                    <React.Fragment>+ &#8377;0</React.Fragment>
                  ) : (
                    <React.Fragment>+ &#8377;20</React.Fragment>
                  )}
                </span>
              </li>
            </ul>
            <div className="cart__billing-item total">
              <span className="cart__billing-title">Total</span>
              <span className="cart__billing-title">
                &#8377; {totalCheckoutPrice}
              </span>
            </div>
          </div>
          <div className="cart__billing-footer"></div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
