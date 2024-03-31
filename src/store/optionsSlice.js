import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
  name: "options",
  initialState: {
    value: {
      sfx: 80,
    },
  },
  reducers: {
    setOptionsSFX: (state, action) => {
      state.value.sfx = action.payload;
    },
  },
});

export const { setOptionsSFX } = optionsSlice.actions;
export default optionsSlice.reducer;
