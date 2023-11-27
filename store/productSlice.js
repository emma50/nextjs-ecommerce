import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: []
}
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProduct(state, action) {
      state.product = action.payload
    },
    updateProduct(state, action) {
      state.product = action.payload
    },
    emptyProduct(state, action) {
      state.product = []
    },
  }
})

export const {
  createProduct,
  updateProduct,
  emptyProduct,
} = productSlice.actions

export default productSlice.reducer;