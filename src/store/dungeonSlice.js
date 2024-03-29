import { createSlice } from "@reduxjs/toolkit";
import { CELL_FLOOR, DUNGEON_MAP } from "../constants";

const dungeonSlice = createSlice({
  name: "dungeon",
  initialState: {
    value: DUNGEON_MAP,
  },
  reducers: {
    killEnemy: (state, action) => {
      const [i, j] = action.payload;
      state.value[i][j] = CELL_FLOOR;
    }
  },
});

export const { killEnemy } = dungeonSlice.actions;
export default dungeonSlice.reducer;
