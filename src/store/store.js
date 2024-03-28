import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";
import playerLocationReducer from "./playerLocationSlice";
import playerDirectionReducer from "./playerDirectionSlice";
import dungeonReducer from "./dungeonSlice";
import informationSlice from "./informationSlice";

export default configureStore({
  reducer: {
    screen: screenReducer,
    playerLocation: playerLocationReducer,
    playerDirection: playerDirectionReducer,
    dungeon: dungeonReducer,
    information: informationSlice,
  },
});
