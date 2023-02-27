import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = () => moment().subtract(1, "d").format("YYYY-MM-DD");

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    set: (state, action) => {
      if (!action.payload || !moment(action.payload).isValid()) {
        return initialState();
      }
      return moment(action.payload).format("YYYY-MM-DD");
    },
  },
});

export const { set } = dateSlice.actions;

export default dateSlice.reducer;
