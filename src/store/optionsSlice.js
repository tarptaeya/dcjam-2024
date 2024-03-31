import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
  name: "options",
  initialState: {
    value: {
      sfx: 80,
      fov: 100,
    },
  },
  reducers: {
    setOptionsSFX: (state, action) => {
      state.value.sfx = action.payload;
    },
    setOptionsFOV: (state, action) => {
      state.value.fov = action.payload;
    },
  },
});

export const { setOptionsSFX, setOptionsFOV } = optionsSlice.actions;
export default optionsSlice.reducer;
