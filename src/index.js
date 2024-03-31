import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { keydownHandler } from "./inputHandler";
import Loading from "./components/Loading";

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);

window.dcjam = {};

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
);

document.addEventListener("keydown", keydownHandler);
