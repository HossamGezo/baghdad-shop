// --- Libraries

import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// --- Reducers & Actions

import products, { addProduct, deleteProduct, updateProduct } from "@features/products/productsSlice";
import cart, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@features/cart/cartSlice";
import users, { deleteUser, updateUserRole } from "@features/users/usersSlice";
import auth, { loginUser, logout, registerUser, resetPassword, updateProfile } from "@features/auth/authSlice";
import orders, { createOrder } from "@features/orders/ordersSlice";

// --- Custom Middlewares

const customMiddleware = createListenerMiddleware();

// -- localStorage

// - cart
customMiddleware.startListening({
  matcher: isAnyOf(addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    window.localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  },
});

// - auth

// Register & Login
customMiddleware.startListening({
  matcher: isAnyOf(registerUser.fulfilled, loginUser.fulfilled, updateProfile.fulfilled, updateUserRole.fulfilled),
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

// -- Cart

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

// -- User

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

// -- Auth

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

// - toast : Update Profile

// fulfilled
customMiddleware.startListening({
  matcher: isAnyOf(updateProfile.fulfilled),
  effect: () => {
    toast.success("Your profile has been updated successfully!");
  },
});

// rejected
customMiddleware.startListening({
  matcher: isAnyOf(updateProfile.rejected),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    toast.error(state.auth.error);
  },
});

// -- Products

// - toast : add product (Admin)
customMiddleware.startListening({
  matcher: isAnyOf(addProduct.fulfilled),
  effect: () => {
    toast.success("Product has been added successfully!");
  },
});

// - toast : update product (Admin)
customMiddleware.startListening({
  matcher: isAnyOf(updateProduct.fulfilled),
  effect: () => {
    toast.success("Product has been updated successfully!");
  },
});

// - toast : delete product (Admin)
customMiddleware.startListening({
  matcher: isAnyOf(deleteProduct.fulfilled),
  effect: () => {
    toast.error("Product has been deleted");
  },
});

// -- Orders

// - toast : create order
customMiddleware.startListening({
  matcher: isAnyOf(createOrder.fulfilled),
  effect: (_action, listenerApi) => {
    toast.success("Your order has been placed successfully!");
    listenerApi.dispatch(clearCart());
  },
});

// --- Store

const store = configureStore({
  reducer: {
    products,
    cart,
    users,
    auth,
    orders,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(customMiddleware.middleware),
});

// --- Store Types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
