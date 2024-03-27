import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { updatePlayerLocation } from "./store/playerLocationSlice";

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

document.addEventListener('keydown', e => {
  const screen = store.getState().screen.value;
  if (screen === 'game') {
    if (e.code === 'KeyW') {
      const playerLocation = store.getState().playerLocation.value;
      store.dispatch(updatePlayerLocation([playerLocation[0] - 1, playerLocation[1]]));
    } else if (e.code === 'KeyS') {
      const playerLocation = store.getState().playerLocation.value;
      store.dispatch(updatePlayerLocation([playerLocation[0] + 1, playerLocation[1]]));
    }
  }
});