import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import HighchartsDemo from "./components/HighchartsDemo";
import MaterialDemo from "./components/MaterialDemo";
import SignIn from "./components/SignIn";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import './App.css';
import Demo from "./components/HighchartsDemo";

function App() {
  return (
    <div className="app">
     <Header/>
     <div className="app__body">
         <Sidebar/>
         <Dashboard/>
         {/* <Demo/> */}
        
     </div>
      
      
      
    </div>
  );
}

export default App;
