import { configureStore } from "@reduxjs/toolkit";

import screenReducer from "./screenSlice";
import playerLocationReducer from "./playerLocationSlice";
import playerDirectionReducer from "./playerDirectionSlice";
import dungeonReducer from "./dungeonSlice";
import informationReducer from "./informationSlice";
import playerHealthReducer from "./playerHealthSlice";
import currentCombatReducer from "./currentCombatSlice";
import inventoryReducer from "./inventorySlice";
import stageReducer from "./stageSlice";
import playerSanityReducer from "./playerSanitySlice";
import optionsReducer from "./optionsSlice";
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    screen: screenReducer,
    playerLocation: playerLocationReducer,
    playerDirection: playerDirectionReducer,
    dungeon: dungeonReducer,
    information: informationReducer,
    playerHealth: playerHealthReducer,
    currentCombat: currentCombatReducer,
    inventory: inventoryReducer,
    stage: stageReducer,
    playerSanity: playerSanityReducer,
    options: optionsReducer,
    loading: loadingReducer,
  },
});
