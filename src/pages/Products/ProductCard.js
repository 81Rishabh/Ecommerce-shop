import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../Cart/features/cartSlice";

function ProductCard({ product }) {
  const { id, name, gender, price, type, imageURL } = product;
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  // handle add to cart
  const handleAddToCart = (productId) => {
    const addToCartButton = document.getElementById(`addToCart-${productId}`);
    const getRemoveToCartButton = document.getElementById(
      `removeToCart-${productId}`
    );

    if (!isAdded) {
      getRemoveToCartButton.style.display = "block";
      addToCartButton.style.display = "none";
      setIsAdded(true);
    }

    //  dispatch an add to cart action
    dispatch(addToCart(product));
  };

  // handle remove to cart
  const handleRemoveToCart = (event, productId) => {
    const getRemoveToCartButton = document.getElementById(
      `removeToCart-${productId}`
    );
    const addToCartButton = document.getElementById(`addToCart-${productId}`);

    if (isAdded) {
      getRemoveToCartButton.style.display = "none";
      addToCartButton.style.display = "block";
      setIsAdded(false);
    }

    //  dispatch an remove from cart action
    dispatch(removeToCart(productId));
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="image-wraper">
          <img src={imageURL} alt={imageURL} className="product_image" />
        </div>
      </div>
      <div className="card-content">
        <div className="card-content-left">
          <span className="product-name">{name}</span>
          <br />
          <span className="gender">{gender}</span>{" "}
          <span className="product-type">&bull; {type}</span>
        </div>
        <p className="product-price">
          <svg
            style={{ marginRight: "5px" }}
            width="15"
            height="15"
            fill="lightgrey"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.28 4.08a1.2 1.2 0 0 0-1.2 1.2v5.503c0 .319.127.624.352.849l8.4 8.4a1.2 1.2 0 0 0 1.696 0l5.504-5.504a1.2 1.2 0 0 0 0-1.696l-8.4-8.4a1.2 1.2 0 0 0-.849-.352H5.28Zm4.8 4.2a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Z"></path>
          </svg>
          <span>{price} Rs</span>
        </p>
      </div>
      <div className="card-footer">
        {/* add to cart button*/}

        <button
          type="button"
          className="addToCart"
          id={`addToCart-${id}`}
          onClick={(e) => handleAddToCart(id)}
        >
          <div className="button-inner">
            <span>
              <svg
                style={{ marginRight: "5px" }}
                width="20"
                height="20"
                fill="#fff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.48 3.12a.6.6 0 1 0 0 1.2h1.332l.481 1.929 1.798 9.582a.6.6 0 0 0 .589.49h1.2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8h8.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8h1.2a.6.6 0 0 0 .59-.49l1.8-9.6a.599.599 0 0 0-.59-.71H6.348l-.486-1.946a.6.6 0 0 0-.582-.455h-1.8Zm6.6 15.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm8.4 0a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm-4.8-10.2v1.8h1.8a.6.6 0 1 1 0 1.2h-1.8v1.8a.6.6 0 1 1-1.2 0v-1.8h-1.8a.6.6 0 1 1 0-1.2h1.8v-1.8a.6.6 0 1 1 1.2 0Z"></path>
              </svg>
            </span>{" "}
            <span>Add to Cart</span>
          </div>
        </button>

        {/* Remove from cart button*/}

        <button
          type="button"
          className="removeToCart"
          id={`removeToCart-${id}`}
          onClick={(e) => handleRemoveToCart(e, id)}
          style={{ marginRight: "5px" }}
        >
          <div className="button-inner">
            <span>
              <svg
                style={{ marginRight: "5px" }}
                width="23"
                height="23"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.48 3.12a.6.6 0 1 0 0 1.2h1.332l.481 1.929 1.798 9.582a.6.6 0 0 0 .589.49h1.2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8h8.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8h1.2a.6.6 0 0 0 .59-.49l1.8-9.6a.599.599 0 0 0-.59-.71H6.348l-.486-1.946a.6.6 0 0 0-.582-.455h-1.8Zm6.6 15.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm8.4 0a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm-7.8-8.4h4.8a.6.6 0 1 1 0 1.2h-4.8a.6.6 0 1 1 0-1.2Z"></path>
              </svg>
            </span>

            <span>Remove from Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
