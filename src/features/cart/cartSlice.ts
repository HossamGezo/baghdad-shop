// --- Libraries
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// --- Types
import type { CartType } from "@/types/types";

// --- localStorage
const cart: CartType[] = JSON.parse(
  window.localStorage.getItem("cart") || "[]",
);

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
      const product = state.cart.find(
        (product) => product.id === action.payload.id,
      );
      // --- Logic
      if (product) {
        product.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count++;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(
        (product) => product.id === action.payload,
      );
      if (product) product.count--;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
});

// --- actions
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
