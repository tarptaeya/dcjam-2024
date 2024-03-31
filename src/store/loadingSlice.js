import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: {
      progress: 30,
    },
  },
  reducers: {
    updateLoading: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
