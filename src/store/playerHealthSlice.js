import { createSlice } from "@reduxjs/toolkit";

const playerHealthSlice = createSlice({
  name: "playerHealth",
  initialState: {
    value: 100,
  },
  reducers: {
    updatePlayerHealth: (state, action) => {
      state.value = action.payload;
    },
    processEnemyAttack: (state, action) => {
      const attack = action.payload;
      state.value -= attack.damage;
      if (state.value < 0) {
        state.value = 0;
      }
    },
  },
});

export const { updatePlayerHealth, processEnemyAttack } =
  playerHealthSlice.actions;
export default playerHealthSlice.reducer;
