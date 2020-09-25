import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import theme from "../src/Themes/theme";
import {createStore ,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/index'


const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer,middleware);

ReactDOM.render(
  

  <Provider store={store}>
  <React.StrictMode>
 
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
   
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
