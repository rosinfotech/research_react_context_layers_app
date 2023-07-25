import "./index.scss";
import { App } from "@components/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot( document.querySelectorAll( "body > div" )[ 0 ] ).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
