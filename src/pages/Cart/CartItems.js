import {removeToCart} from './features/cartSlice';
import {useDispatch } from 'react-redux';
import { useState } from 'react';
import {updateCheckOutPrice} from './features/cartSlice';

function CartItems({ item }) {
    const { id, name, price, imageURL, gender , quantity } = item;
    const [qty , setqty] = useState(quantity);
    const [newPrice , setnewPrice] = useState(price * qty);
    const dispatch = useDispatch();
    

    // handling remove item form cart
    const handleRemoveItem = (id) => dispatch(removeToCart(id));

    // handling qty increment
    const handleQtyIncrement = () => {
        setqty(prev => {
            prev += 1;
            let newCurrentPrice = 0;
            newCurrentPrice += newPrice + price;

            // set new Price
            setnewPrice(newCurrentPrice)

            // update checkout price
            
            return prev;
        });
        dispatch(updateCheckOutPrice({type : "increment" , price}));
    }

     // handling qty decrement
    const handleQtyDecrement = () => {
        setqty(prev => {
            if(prev !== 0) {
                prev = prev - 1
                let newCurrentPrice = 0;
                newCurrentPrice += newPrice - price;
                setnewPrice(newCurrentPrice)
            }
            return prev;
        });
        dispatch(updateCheckOutPrice({type : "decrement" , price}));
    }

    return (
        <div className="cart__item__card">
            <div className="cart__item__left">
                <div className="cart__item__image">
                    <img src={imageURL} alt="product_image" width="100%" />
                </div>
                <div className="cart__item__info">
                    <span className="product-name">{name}</span>{"  "}
                    <span className="gender">&bull; {gender}</span><br />
                    <span className="price">&#8377;{" "} {price}</span>{" "}
                </div>
            </div>

            <div className="cart__item__right">
                <div className="cart__item__actions">
                   <button type="button" className="cart__item__plus" onClick={handleQtyIncrement}>+</button>
                   <div className="cart__item__quantity">{qty}</div>
                   <button type="button" className="cart__item__dash" onClick={handleQtyDecrement}>-</button>
                </div>
                <div className="cart__item__price">
                   <span> &#8377;{" "}
                   {newPrice}</span>
                </div>
                <div className="cart__item__close" onClick={() => handleRemoveItem(id)}>
                    <svg width="15" height="15" fill="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default CartItems;