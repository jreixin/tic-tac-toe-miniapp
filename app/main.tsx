import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// MiniKit initialization
import { MiniKit } from "@base-org/minikit";

MiniKit.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
