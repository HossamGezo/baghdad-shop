// --- Libraries
import {createSlice} from "@reduxjs/toolkit";

// --- Types
import type {CartProps} from "../../types";

// --- localStorage
const storedCart = localStorage.getItem("cart");
const cart: CartProps[] = storedCart ? JSON.parse(storedCart) : [];

const setCartToLocalStorage = (cartItems: CartProps[]) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

// --- InitialStateProps (Types)

type InitialStateProps = {
  cart: CartProps[];
};

// --- initialState
const initialState: InitialStateProps = {
  cart: cart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: {payload: CartProps}) => {
      /**
       * ===============
       * Important Note:
       * ===============
       * When you add product add it with count property
       */
      // --- Existence
      const product = state.cart.find(
        (product) => product.id === action.payload.id,
      );
      // --- Logic
      if (product) {
        product.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
      // --- Update localStorage
      setCartToLocalStorage(state.cart);
    },
    increaseQuantity: (state, action: {payload: number}) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count++;
      // --- Update localStorage
      setCartToLocalStorage(state.cart);
    },
    decreaseQuantity: (state, action: {payload: number}) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count--;
      // --- Update localStorage
      setCartToLocalStorage(state.cart);
    },
    removeFromCart: (state, action: {payload: number}) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload,
      );
      // --- Update localStorage
      setCartToLocalStorage(state.cart);
    },
  },
});

// --- actions
export const {addToCart, increaseQuantity, decreaseQuantity, removeFromCart} =
  cartSlice.actions;

export default cartSlice.reducer;
