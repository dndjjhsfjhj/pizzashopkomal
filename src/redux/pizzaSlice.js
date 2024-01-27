import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: [],
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const { id, field, value } = action.payload;
      const order = state.orders.find((item) => item.id === id);
      const index = state.orders.indexOf(order);
      state.orders[index][field] = value;
    },
    updateDelays: (state, action) => {
      const { id, field, value } = action.payload;
      const order = state.orders.find((item) => item.id === id);
      const index = state.orders.indexOf(order);
      state.orders[index]["delays"][field] = value;
    },
  },
});

export const { placeOrder, updateOrder, updateDelays } = pizzaSlice.actions;
export default pizzaSlice.reducer;
