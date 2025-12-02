import React from "react";
import ReactDOM from "react-dom/client";
import App from "./TicTacToe";
import "./styles.css";

// MiniKit initialization
import { MiniKit } from "@base-org/minikit";

MiniKit.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
