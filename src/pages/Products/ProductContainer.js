import React, {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts , debounceSearch } from "./features/productSlice";
import ProductList from "./ProductList";

function ProductContainer(props) {
  const {open , setOpen} = props;
  const [size , setSize] = useState(window.innerWidth);
  const { filterProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  // fetching all the products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // handle window resize
  useEffect(() => {
    const handleResize = (e) => {
      let w = e.target.innerWidth;
      setOpen(w <= 600 ? true : false);
      setSize(e.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize' , handleResize);
  },[setOpen]);

  


  // handle search product 
  const handleSearch = (e) => {
    debounce(debounceSearch)(e.target.value);
  }

  // debounce serach
  function debounce(cb , delay = 1000){
      let timeout;
      return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
             dispatch(cb(...args))
          },delay);
      }
  }
  
  return (
    <section id="product-container" style={{
       marginLeft : (size >= 600 && !open) ? '250px' : '0px'
    }}>
      <div className="search_bar_container">
        <div className="search_bar_wrapper">
          <span className="search_bar_icon">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products by name"
            className="search-bar"
            onChange={handleSearch}
          />
        </div>
        <div className="filterIcon" title="filter" onClick={() => setOpen(!open)}>
          <svg
            width="20"
            height="20"
            fill="blue"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.005 6h10l-5.01 6.3L7.005 6Zm-2.75-.39c2.02 2.59 5.75 7.39 5.75 7.39v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39a.998.998 0 0 0-.79-1.61H5.045c-.83 0-1.3.95-.79 1.61Z"></path>
          </svg>
          <span>Filter</span>
        </div>
      </div>
      {<ProductList products={filterProducts} />}
    </section>
  );
}

export default ProductContainer;
