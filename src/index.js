import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { updatePlayerLocation } from "./store/playerLocationSlice";
import { nextLocation } from './location';
import { reverseDirection } from "./direction";

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
  const state = store.getState();
  const screen = state.screen.value;
  const playerLocation = state.playerLocation.value;
  const playerDirection = state.playerDirection.value;

  if (screen === 'game') {
    if (e.code === 'KeyW') {
      const targetLocation = nextLocation(playerLocation, playerDirection);
      store.dispatch(updatePlayerLocation(targetLocation));
    } else if (e.code === 'KeyS') {
      const targetLocation = nextLocation(playerLocation, reverseDirection(playerDirection));
      store.dispatch(updatePlayerLocation(targetLocation));
    }
  }
});