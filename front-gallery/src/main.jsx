import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextMainProvider } from "./context/ContextMain";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextMainProvider>
      <App />
    </ContextMainProvider>
  </React.StrictMode>
);
