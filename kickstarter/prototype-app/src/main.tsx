import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Design-system CSS/theme imports go first, then the kit's token bridge.
import "./tokens/tokens.css";
import "./app/app.css";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
