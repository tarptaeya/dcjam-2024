import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { keydownHandler } from "./inputHandler";

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);


window.dcjam = {};


const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

document.addEventListener("keydown", keydownHandler);
