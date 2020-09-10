import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import HighchartsDemo from "./components/HighchartsDemo";
import MaterialDemo from "./components/MaterialDemo";
import SignIn from "./components/SignIn";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="app">
     <Header/>
     <div className="app__body">
         <Sidebar/>
     </div>
      
      
      
    </div>
  );
}

export default App;
