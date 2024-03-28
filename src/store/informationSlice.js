import { createSlice } from "@reduxjs/toolkit";

const informationSlice = createSlice({
  name: "informationSlice",
  initialState: {
    value: {
      message: null,
      isEnemy: false,
    },
  },
  reducers: {
    updateInformation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateInformation } = informationSlice.actions;
export default informationSlice.reducer;
