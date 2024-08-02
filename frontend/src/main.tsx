import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StarknetProvider } from "./provider/StarknetProvider.tsx";
import { AccountProvider } from "./provider/AccountProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StarknetProvider>
      <AccountProvider>
      <App />
      </AccountProvider>
    </StarknetProvider>
  </React.StrictMode>
);
