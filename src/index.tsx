import * as React from "react";
import * as ReactDOM from "react-dom";

import { Home } from "./components/Home";

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Home compiler="TypeScript" framework="React" />,
    document.getElementById("app")
  );
}
