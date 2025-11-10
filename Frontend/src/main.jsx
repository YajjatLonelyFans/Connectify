import React from "react";
import ReactDOM from "react-dom/client";
import AuthContext from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
