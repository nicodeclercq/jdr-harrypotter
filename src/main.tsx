import React from "react";
import { ReactAppRoot } from "./root";
import App from "./App";
import "./index.css";

ReactAppRoot.render(
  <React.StrictMode>
    <App />
    <div id="portal"></div>
  </React.StrictMode>
);
