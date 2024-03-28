import { createSlice } from "@reduxjs/toolkit";

const currentCombatSlice = createSlice({
  name: "currentCombat",
  initialState: {
    value: {
      isActive: false,
      enemyHealth: null,
      playerAttackOptions: [],
      enemyAttackOptions: [],
      playerTurn: true,
    },
  },
  reducers: {
    startCombat: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
        isActive: true,
        playerTurn: true,
      };
    },
    processPlayerAttack: (state, action) => {
      const attack = action.payload;
      state.value.enemyHealth -= attack.damage;
      if (state.value.enemyHealth < 0) {
        state.value.enemyHealth = 0;
      }
    },
    alternateTurn: (state) => {
      state.value.playerTurn = !state.value.playerTurn;
    },
  },
});

export const { startCombat, processPlayerAttack, alternateTurn } =
  currentCombatSlice.actions;
export default currentCombatSlice.reducer;
