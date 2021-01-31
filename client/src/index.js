import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.css";
import App from "./pages/index";
import EditPage from "./pages/edit";
import ImageManager from "./pages/imagemanager";
import Strings from "./pages/strings";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/edit/:document" component={EditPage} />
      <Route exact path="/imagemanager" component={ImageManager} />
      <Route exact path="/strings" component={Strings} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
