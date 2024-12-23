import React from "react";
import { createRoot } from "react-dom/client";
import PopupApp from "../PopupApp";

async function initPopup(): Promise<void> {
    const container = document.getElementById("popup-root")!;
    const root = createRoot(container);
    root.render(<PopupApp />);
}

initPopup().catch(console.error);
