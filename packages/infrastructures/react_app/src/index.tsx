import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
import { AppDataProvider } from "./context/AppDataProviderContext";
import { AppInit } from "./context/AppInitContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <AppInit>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </AppInit>
  </BrowserRouter>,
);

reportWebVitals();
