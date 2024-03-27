import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";

export default configureStore({
  reducer: {
    screen: screenReducer,
  },
});
