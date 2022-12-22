import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Providers from "./providers";
import { App } from "./app";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  </React.StrictMode>,
  document.getElementById("app")
);
