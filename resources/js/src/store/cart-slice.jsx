import { createSlice } from '@reduxjs/toolkit';
import { mainActions } from "./main-slice";

let cartItems = localStorage.getItem('cart');
cartItems = cartItems ? JSON.parse(cartItems) : [];

const cartInitialState = {
    isCartVisible: false,
    items: cartItems
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        changeVisibility(state) {
            state.isCartVisible = !state.isCartVisible;
        },
        addItem(state, action) {
            if (action.payload) {
                const existingProductIndex = state.items.findIndex((p) => {
                    return p.id === action.payload.id;
                });

                if (existingProductIndex > -1) {
                    state.items[existingProductIndex].amount++;
                } else {
                    state.items.push(action.payload);
                }

                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart(state) {
            state.items = [];
            localStorage.removeItem('cart');
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
