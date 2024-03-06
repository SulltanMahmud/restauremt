import { configureStore } from '@reduxjs/toolkit';
import tableReducer from "../../hooks/tableSlice" // Import your reducer from the slice file

const store = configureStore({
  reducer: {
    table: tableReducer, // Add your reducer to the store
    // Add other reducers if you have them
  },
  // Add middleware, enhancers, and other configurations if needed
});

export default store;
