import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from './NewCom/Navbaar';
import Home from './NewCom/Home';
import View from './NewCom/View';
import Edit from './NewCom/Edit';
import "./App.css"
import { Switch, Route } from "react-router-dom";
import Register from './NewCom/Register';


const App = () => {
  return (
    <>
      <Navbaar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/getdata/:id">
          <View />
        </Route>
        <Route exact path="/edit/:id">
          <Edit />
        </Route>
        <Route exact path="/:id">
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App
