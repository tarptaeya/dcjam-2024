import { createSlice } from "@reduxjs/toolkit";
import { CELL_FLOOR, DUNGEON_MAP } from "../constants";

const dungeonSlice = createSlice({
  name: "dungeon",
  initialState: {
    value: DUNGEON_MAP,
  },
  reducers: {
    updateCell: (state, action) => {
      const { location, cellType } = action.payload;
      const [i, j] = location;
      state.value[i][j] = cellType;
    },
    setDungeon: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { killEnemy, updateCell, setDungeon } = dungeonSlice.actions;
export default dungeonSlice.reducer;
