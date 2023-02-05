import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  items: [],
  totalProductPrice: 0,
  totalCheckoutPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      state.count += 1;
      state.items.push(action.payload);
       
      // get total ammount
      let total = getTotal(state);
     
      state.totalProductPrice = total;
      state.totalCheckoutPrice = total + 20; // where 20 is shipping charges
    },

    removeToCart: (state, action) => {
      state.count -= 1;
      state.items = state.items.filter((item) => item.id !== action.payload);

       // get total ammount
       let total = getTotal(state);

       state.totalProductPrice = total;
      
       state.totalCheckoutPrice = state.items.length === 0 ? 0 : (total + 20);
    },

    updateCheckOutPrice: (state, action) => {
      const { type, price } = action.payload;
      if (type === "increment") {
        state.totalProductPrice += price;
        state.totalCheckoutPrice += price;
      } else {
        state.totalProductPrice -= price;
        state.totalCheckoutPrice -= price;
      }
    },
  },
});

function getTotal(state) {
    // calculate total ammount
    let total = state.items.reduce((acc, curr) => {
      acc += curr.price * curr.quantity;
      return acc;
    }, 0);
    return total;
}

export default cartSlice.reducer;
export const { addToCart, removeToCart, updateCheckOutPrice } =
  cartSlice.actions;
