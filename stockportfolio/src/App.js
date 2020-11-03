import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import HighchartsDemo from "./components/HighchartsDemo";
import MaterialDemo from "./components/MaterialDemo";
import SignIn from "./components/SignIn/SignIn";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import './App.css';
// import Demo from "./components/HighchartsDemo";
// import Button from "./components/Button";
import Register from "./components/Register/Register";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
    <Switch>
    <Route path="/" exact>
    <div className="app">
     <Header/>
     <div className="app__body">
         <Sidebar/>
         <Dashboard/>
         <Register/>
     </div>
    </div>
    </Route>
    <Route path="/register" exact>
      <Register/>
    </Route>
    <Route path ="/signin" exact>
      <SignIn/>
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
