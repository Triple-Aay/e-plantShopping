import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { name, image, cost, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((i) => i.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem(state, action) {
      // Allow passing either a string (name) or { name }
      const name =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.name;
      state.items = state.items.filter((i) => i.name !== name);
    },
    updateQuantity(state, action) {
      // payload: { name, quantity }
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
