import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        clearCart: state => {
            state.splice(0, state.length);
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;
