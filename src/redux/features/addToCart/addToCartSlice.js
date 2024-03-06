import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0,
}

const addToCartSlice  = createSlice({
    name: 'counter',
    initialState,
    reducers : {
        increment  : (state) =>{
            state.count = state.count + 1;
        },
       
    },
})

export const {increment} = addToCartSlice.actions;

export default addToCartSlice.reducer;
