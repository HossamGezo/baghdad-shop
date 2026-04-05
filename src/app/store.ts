// --- Libraries

import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// --- Reducers & Actions

import products from "@features/products/productsSlice";
import cart, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@features/cart/cartSlice";

// --- Custom Middlewares

const cartListener = createListenerMiddleware();

// - localStorage

cartListener.startListening({
  matcher: isAnyOf(
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  ),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    window.localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  },
});

// - toast : add to cart

cartListener.startListening({
  matcher: isAnyOf(addToCart),
  effect: () => {
    toast.success("Product has been added to cart!");
  },
});

// - toast : remove from cart

cartListener.startListening({
  matcher: isAnyOf(removeFromCart),
  effect: () => {
    toast.error("Product removed from cart");
  },
});

// --- Store

const store = configureStore({
  reducer: {
    products,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListener.middleware),
});

// --- Store Types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
