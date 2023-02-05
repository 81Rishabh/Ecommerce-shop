import "./checkbox.scss";
import React, {useState } from "react";


function CheckBox({ handleCheckBox, value, slug }) {
  const [show, setshow] = useState(false);
 
  // handle checkbox evenet
  const handleCheckBoxSelection = (e) => {
    handleCheckBox(!show, value, slug);
    setshow(!show);
  };

  return (
    <label>
      <input type="checkbox" />
      <span className="checkbox" onClick={handleCheckBoxSelection}>
        <svg
          style={{ display: show ? "block" : "none" }}
          width="15"
          height="15"
          fill="none"
          stroke="blue"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </span>
    </label>
  );
}

export default CheckBox;
