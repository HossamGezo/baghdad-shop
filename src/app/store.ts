// --- Libraries
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

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
cartListener.startListening({
  matcher: isAnyOf(
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  ),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    globalThis.localStorage.setItem("cart", JSON.stringify(state.cart.cart));
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
