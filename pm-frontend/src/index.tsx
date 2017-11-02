import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from 'semantic-ui-react'
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from "./components/App";

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById("header")
);
