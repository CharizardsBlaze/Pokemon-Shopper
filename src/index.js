// TODO - Temporary Semnatic import to have a simple UI for testing.
import "semantic-ui-css/semantic.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// REVIEW - Look at createBrowserRouter instead, as it is recommended.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
