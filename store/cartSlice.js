import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cartItems: []
  cartItems: {
    products: []
  }
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // state.cartItems.products.push(action.payload)
      state.cartItems = action.payload
      state.cartItems.products = action.payload.products
    },
    updateCart(state, action) {
      state.cartItems = action.payload
    },
    emptyCart(state, action) {
      // state.cartItems = []
      state.cartItems = {products: []}
    },
  }
})

export const {
  addToCart,
  updateCart,
  emptyCart,
} = cartSlice.actions

export default cartSlice.reducer;