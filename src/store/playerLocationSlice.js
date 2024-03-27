import { createSlice } from "@reduxjs/toolkit";

const playerLocationSlice = createSlice({
  name: "playerLocation",
  initialState: {
    value: [7, 12],
  },
  reducers: {
    updatePlayerLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePlayerLocation } = playerLocationSlice.actions;
export default playerLocationSlice.reducer;
