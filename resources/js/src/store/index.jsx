import cartSliceReducer from './cart-slice';
import mainSliceReducer from './main-slice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
        main: mainSliceReducer
    }
});

export default store;



