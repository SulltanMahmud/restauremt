import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from '../redux/features/counter/counterSlice';

const store = configureStore({
    reducer: {
        counter: CounterReducer
    },
});

export default store