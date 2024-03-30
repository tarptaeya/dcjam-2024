import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
  name: "stage",
  initialState: {
    value: {
      isLifted: false,
      isVisible: true,
    },
  },
  reducers: {
    liftStage: (state) => {
      state.value.isLifted = true;
    },
    setStageVisible: (state, action) => {
      state.value.isVisible = action.payload;
    }
  },
});

export const { liftStage, setStageVisible } = stageSlice.actions;
export default stageSlice.reducer;
