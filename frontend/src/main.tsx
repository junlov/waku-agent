import { createRoot } from "react-dom/client";
import "./index.css";
// Registers window.WakuCurriculum (the #learn island adapter) — unchanged.
import "./curriculum.js";
import { App } from "./shell/App.js";

const el = document.getElementById("root");
if (el) createRoot(el).render(<App />);
