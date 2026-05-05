// --- Libraries
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// --- Types
import type { CartType } from "@/types/types";

// --- localStorage
const cart: CartType[] = JSON.parse(window.localStorage.getItem("cart") || "[]");

// --- CartState (Types)
export type CartState = {
  cart: CartType[];
};

// --- initialState
const initialState: CartState = {
  cart: cart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
      /**
       * ===============
       * Important Note:
       * ===============
       * When you add product add it with count property
       */
      // --- Existence
      const product = state.cart.find((item) => item.productId === action.payload.productId);

      // --- Logic
      if (product) {
        product.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.productId === action.payload);
      if (product) product.count++;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.productId === action.payload);
      if (product) product.count--;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// --- actions
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
