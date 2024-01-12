import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearBag: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      const removedProductIndex = state.products.findIndex(
        (product) => product._id === productIdToRemove
      );

      if (removedProductIndex !== -1) {
        const removedProduct = state.products[removedProductIndex];
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(removedProductIndex, 1);
      }
    },
  },
});

export const { addProduct, clearBag, removeProduct } = bagSlice.actions;
export default bagSlice.reducer;
