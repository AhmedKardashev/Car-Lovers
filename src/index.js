import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { CarsContextProvider } from "./store/cars-context";

ReactDOM.render(
  <AuthContextProvider>
    <CarsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarsContextProvider>
  </AuthContextProvider>,

  document.getElementById("root")
);
