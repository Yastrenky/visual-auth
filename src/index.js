import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";

export const store = createStore(combineReducers({ ...reducers }))

const sessionID = JSON.parse(sessionStorage.getItem('session'))
if (sessionID) {
    store.dispatch({ type: "LOGIN_USER" });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
