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
import users, { deleteUser, updateUserRole } from "@features/users/usersSlice";

// --- Custom Middlewares

const customMiddleware = createListenerMiddleware();

// - localStorage

customMiddleware.startListening({
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

customMiddleware.startListening({
  matcher: isAnyOf(addToCart),
  effect: () => {
    toast.success("Product has been added to cart!");
  },
});

// - toast : remove from cart

customMiddleware.startListening({
  matcher: isAnyOf(removeFromCart),
  effect: () => {
    toast.error("Product removed from cart");
  },
});

// - toast : update user

customMiddleware.startListening({
  matcher: isAnyOf(updateUserRole.fulfilled),
  effect: () => {
    toast.success("User has been updated successfully");
  },
});

// - toast : remove user

customMiddleware.startListening({
  matcher: isAnyOf(deleteUser.fulfilled),
  effect: () => {
    toast.error("User has been deleted");
  },
});

// --- Store

const store = configureStore({
  reducer: {
    products,
    cart,
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(customMiddleware.middleware),
});

// --- Store Types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
