import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";
import playerLocationReducer from './playerLocationSlice';

export default configureStore({
  reducer: {
    screen: screenReducer,
    playerLocation: playerLocationReducer,
  },
});
