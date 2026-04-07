// --- Libraries

import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// --- Reducers & Actions

import products from "@features/products/productsSlice";
import cart, { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "@features/cart/cartSlice";
import users, { deleteUser, updateUserRole } from "@features/users/usersSlice";
import auth, { loginUser, logout, registerUser, resetPassword } from "@features/auth/authSlice";

// --- Custom Middlewares

const customMiddleware = createListenerMiddleware();

// -- localStorage

// - cart
customMiddleware.startListening({
  matcher: isAnyOf(addToCart, increaseQuantity, decreaseQuantity, removeFromCart),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    window.localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  },
});

// - auth

// Register & Login
customMiddleware.startListening({
  matcher: isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    window.localStorage.setItem("user", JSON.stringify(state.auth.user));
  },
});

// Logout
customMiddleware.startListening({
  matcher: isAnyOf(logout),
  effect: () => {
    window.localStorage.removeItem("user");
  },
});

// --- toast

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

// - toast : Register

// rejected
customMiddleware.startListening({
  matcher: isAnyOf(registerUser.rejected),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    toast.error(state.auth.error);
  },
});

// - toast : Login

// rejected
customMiddleware.startListening({
  matcher: isAnyOf(loginUser.rejected),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    toast.error(state.auth.error);
  },
});

// - toast : Reset Password

// fulfilled
customMiddleware.startListening({
  matcher: isAnyOf(resetPassword.fulfilled),
  effect: (action) => {
    toast.success(action.payload as string);
  },
});

// rejected
customMiddleware.startListening({
  matcher: isAnyOf(resetPassword.rejected),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    toast.error(state.auth.error);
  },
});

// --- Store

const store = configureStore({
  reducer: {
    products,
    cart,
    users,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(customMiddleware.middleware),
});

// --- Store Types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
