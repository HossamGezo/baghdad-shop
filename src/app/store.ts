// --- Libraries
import {configureStore} from "@reduxjs/toolkit";

// --- Slices
import products from "../features/products/productsSlice";
import cart from "../features/cart/CartSlice";

// --- Store
const store = configureStore({
  reducer: {
    products,
    cart,
  },
});

// --- Store Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
