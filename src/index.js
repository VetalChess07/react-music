import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import AudioProvider from "./context/AudioContext";

ReactDOM.render(
  <AudioProvider>
    <App />
  </AudioProvider>,
  document.getElementById("root")
);
