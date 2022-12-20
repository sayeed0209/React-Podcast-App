import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PodcastProvider } from "./context/podcast_content";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PodcastProvider>
      <App />
    </PodcastProvider>
    ,
  </React.StrictMode>,
);
