import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Cryptr from 'cryptr'
import reducers from "./reducers";
import { secure } from './config/index'

export const store = createStore(combineReducers({ ...reducers }))

const sessionID = JSON.parse(sessionStorage.getItem('session'))
if (sessionID) {
    store.dispatch({ type: "LOGIN_USER" });
}

export const cryptr = new Cryptr(secure);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
