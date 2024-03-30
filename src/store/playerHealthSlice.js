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
    incrementPlayerHealth: (state, action) => {
      state.value += action.payload;
      if (state.value > 100) {
        state.value = 100;
      }
    },
  },
});

export const { updatePlayerHealth, processEnemyAttack, incrementPlayerHealth } =
  playerHealthSlice.actions;
export default playerHealthSlice.reducer;
