import { createSlice } from "@reduxjs/toolkit";
import flatpickr from "flatpickr";

const initialState = () => {
  const date = new Date();
  const format = "d.m.Y";
  return { value: flatpickr.formatDate(date.fp_incr(-1), format), format };
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    set: (state, action) => {
      if (!action.payload) {
        return initialState();
      }
      state.value = action.payload;
    },
  },
});

export const { set } = dateSlice.actions;

export default dateSlice.reducer;
