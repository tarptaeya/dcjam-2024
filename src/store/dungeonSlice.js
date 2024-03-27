import { createSlice } from "@reduxjs/toolkit";
import { DUNGEON_MAP } from "../grid";

const dungeonSlice = createSlice({
  name: "dungeon",
  initialState: {
    value: DUNGEON_MAP,
  },
  reducers: {},
});

export const {} = dungeonSlice.actions;
export default dungeonSlice.reducer;
