import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'; // Adjust the path as necessary
export const store = configureStore({
    reducer: {
       cart : cartSlice,

    },
    devTools : true

});