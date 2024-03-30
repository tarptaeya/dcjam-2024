import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
  name: "screen",
  initialState: {
    value: "welcome",
  },
  reducers: {
    updateScreen: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateScreen } = screenSlice.actions;
export default screenSlice.reducer;
