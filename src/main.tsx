import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import App from "./components/App/App"; // Точний шлях до файлу
import "./index.css";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
