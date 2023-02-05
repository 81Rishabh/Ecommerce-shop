import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// intial states
const initialState = {
  loading: false,
  isReset: false,
  products: [],
  filterProducts: [],
  filters: [],
  error: "",
};

// generates pending  , fullfiled and pending state
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    return response.data;
  }
);

// product slice

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // apply checkbox filter
    applyCheckboxFilter: (state, action) => {
      const { isChecked, value, slug } = action.payload;

      if (isChecked) {
        state.filters.push({ key: slug, value });
        state.filterProducts = getFilterData(state);
      } else {
        state.filters = [
          ...state.filters.filter((item) => item.value !== value),
        ];
        state.filterProducts =
          getFilterData(state).length > 0
            ? getFilterData(state)
            : state.products;
      }
    },

    // apply price range filter reduce
    applyPriceRangeFilter: (state, action) => {
      const price = parseInt(action.payload);
      // filter by price
      state.filterProducts = state.products.filter((product) => {
        return product.price <= price;
      });
      state.isReset = false;
    },

    // reset all the filters
    resetAllfilter: (state) => {
      state.filterProducts = state.products;
      state.isReset = true;
    },

    // Search product by name , type , color
    debounceSearch: (state, action) => {
      const resultProducts = state.products.filter(product => {
          let res = new RegExp(`^${action.payload}` , 'gi');
           return product.name.match(res)
           || product.color.match(res) 
           || product.type.match(res)
           || product.gender.match(res)
      });
      state.filterProducts = resultProducts;
    },
  },
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    // fullfilled
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filterProducts = action.payload;
      state.error = "";
    });

    // fullfilled
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

const getFilterData = (state) => {
  let newArr = [];
  state.filters.forEach((data) => {
    let output = state.products.filter((product) => {
      switch (data.key) {
        case "color": {
          return product.color === data.value;
        }
        case "type": {
          return product.type === data.value;
        }
        case "gender": {
          return product.gender === data.value;
        }
        default:
          return "Invalid type";
      }
    });

    // storing ans in new Arr;
    if (newArr.length === 0) {
      newArr = [...output];
    } else {
      newArr = [...newArr, ...output];
    }
  });
  return newArr;
};

export const getAllFilterSlug = (state) => {
  const { products } = state.products;
  let colors = [],
    types = [],
    genders = [],
    getMaxPrice = Number.MIN_VALUE,
    getMinPrice = Number.MAX_VALUE;

  products.forEach((product) => {
    // add colors
    if (colors.indexOf(product.color) === -1) {
      colors.push(product.color);
    }

    // add type
    if (types.indexOf(product.type) === -1) {
      types.push(product.type);
    }

    // get all the gender
    if (genders.indexOf(product.gender) === -1) {
      genders.push(product.gender);
    }

    // get high price
    getMaxPrice = Math.max(getMaxPrice, product.price);
    getMinPrice = Math.min(getMinPrice, product.price);
  });

  return { colors, types, genders, getMaxPrice, getMinPrice };
};

export default productSlice.reducer;
export const {
  applyCheckboxFilter,
  applyPriceRangeFilter,
  resetAllfilter,
  debounceSearch,
} = productSlice.actions;
