// --- Libraries
import {createSlice} from "@reduxjs/toolkit";

// --- Types
import type {CartProps} from "../../types";

// --- InitialStateProps (Types)

type InitialStateProps = {
  cart: CartProps[];
};

// --- initialState
const initialState: InitialStateProps = {
  cart: [],
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
        product.count++;
      } else {
        state.cart.push(action.payload);
      }
    },
    increaseQuantity: (state, action: {payload: number}) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count++;
    },
    decreaseQuantity: (state, action: {payload: number}) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count--;
    },
    removeFromCart: (state, action: {payload: number}) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
});

// --- actions
export const {addToCart, increaseQuantity, decreaseQuantity, removeFromCart} =
  cartSlice.actions;

export default cartSlice.reducer;
