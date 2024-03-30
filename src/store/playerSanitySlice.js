import { createSlice } from "@reduxjs/toolkit";

const playerSanitySlice = createSlice({
  name: "playerSanity",
  initialState: {
    value: 100,
  },
  reducers: {
    updatePlayerSanity: (state, action) => {
      state.value = action.payload;
    },
    decrementPlayerSanity: (state, action) => {
      state.value -= action.payload;
      if (state.value < 0) {
        state.value = 0;
      }
    },
    incrementPlayerSanity: (state, action) => {
      state.value += action.payload;
      if (state.value > 100) {
        state.value = 100;
      }
    },
  },
});

export const {
  updatePlayerSanity,
  incrementPlayerSanity,
  decrementPlayerSanity,
} = playerSanitySlice.actions;
export default playerSanitySlice.reducer;
