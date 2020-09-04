import React from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./views/Home";
import { Pokedex } from "./views/Pokedex";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/pokedex">
            <Pokedex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
