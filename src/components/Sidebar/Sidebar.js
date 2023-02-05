import React, { useState, useEffect, useRef } from "react";
import CheckBox from "../Checkbox/CheckBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllFilterSlug,
  applyCheckboxFilter,
  applyPriceRangeFilter,
  resetAllfilter,
} from "../../pages/Products/features/productSlice";
import "./sidebar.scss";

function Sidebar({ open }) {
  const { colors, types, genders, getMaxPrice, getMinPrice } =
    useSelector(getAllFilterSlug);
  const { isReset } = useSelector((state) => state.products);
  const [midPrice, setmidPrice] = useState(0);
  const dispatch = useDispatch();
  const inputRangeRef = useRef();

  // get half price of highPrice
  useEffect(() => {
    if (getMaxPrice !== Number.MIN_VALUE)
      setmidPrice(Math.floor(getMaxPrice / 2));
  }, [getMaxPrice]);

  // check if filter is rest
  useEffect(() => {
    if (isReset) {
      inputRangeRef.current.value = Math.floor(getMaxPrice / 2);
      setmidPrice(Math.floor(getMaxPrice / 2));
    }
  }, [isReset ,getMaxPrice]);

  // create checkbox event handler
  const handleCheckBox = (isChecked, value, slug) => {
    dispatch(applyCheckboxFilter({ isChecked, value, slug }));
  };

  // handle price range
  const handlePriceRange = (e) => {
    setmidPrice(e.target.value);
    dispatch(applyPriceRangeFilter(e.target.value));
  };

  // handle rest all filter
  const handleRestAllFilter = () => {
    dispatch(resetAllfilter());
  };

  return (
    <div id="sidenav" style={{
       transform: !open ? 'translateX(0)' : 'translateX(-400px)'
    }}>
      <div id="sidebar-header">
        <svg
          width="17"
          height="17"
          fill="none"
          stroke="grey"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.293 3.293A1 1 0 0 0 3 4v2.586a1 1 0 0 0 .293.707l6.414 6.414a1 1 0 0 1 .293.707V21l4-4v-2.586a1 1 0 0 1 .293-.707l6.414-6.414A1 1 0 0 0 21 6.586V4a1 1 0 0 0-1-1H4a1 1 0 0 0-.707.293Z"></path>
        </svg>
        <p className="title">Filters</p>
      </div>

      {/* colors */}
      <div className="filter-container">
        <h3 className="filter-title">Colors</h3>
        <div className="filter-colors">
          <ul>
            {colors &&
              colors.map((color, idx) => {
                return (
                  <li className="filter-list-item" key={idx}>
                    <CheckBox
                      handleCheckBox={handleCheckBox}
                      value={color}
                      slug="color"
                    />
                    <span className="value">{color}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {/* price range */}
      <div className="filter-container">
        <h3 className="filter-title">Price</h3>
        <div className="filter-price-range">
          <input
            type="range"
            name="price-range"
            step="50"
            value={midPrice}
            min={getMinPrice}
            max={getMaxPrice}
            onChange={handlePriceRange}
            ref={inputRangeRef}
          />
          <span className="price">{midPrice}</span>
        </div>
      </div>

      {/* type */}
      <div className="filter-container">
        <h3 className="filter-title">Type</h3>
        <div className="filter-product-type">
          <ul>
            {types &&
              types.map((type, idx) => {
                return (
                  <li className="filter-list-item" key={idx}>
                    <CheckBox
                      handleCheckBox={handleCheckBox}
                      value={type}
                      slug="type"
                    />
                    <span className="value">{type}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {/* Gender */}
      <div className="filter-container">
        <h3 className="filter-title">Gender</h3>
        <div className="filter-gender">
          <ul>
            {genders &&
              genders.map((gender, idx) => {
                return (
                  <li className="filter-list-item" key={idx}>
                    <CheckBox
                      handleCheckBox={handleCheckBox}
                      value={gender}
                      slug="gender"
                    />
                    <span className="value">{gender}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="filter-container">
        <button id="clear-button" onClick={handleRestAllFilter}>
          Clear All filter
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
