import { App } from "@components/App/App";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

createRoot( document.querySelectorAll( "body > div" )[ 0 ] ).render(
    <>
        <App />
    </>,
);
