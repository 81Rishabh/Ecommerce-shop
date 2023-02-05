import {configureStore} from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import productSlice from '../pages/Products/features/productSlice';
import cartSlice from '../pages/Cart/features/cartSlice';

const store = configureStore({
    reducer : {
       products : productSlice,
       cart : cartSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger)
});





export default store;