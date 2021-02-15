import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'; // The magic starts here...
import App from './components/app';
import { ActionTypes } from './actions';

import 'bootstrap/dist/css/bootstrap.css'; // import bootstrap before custom CSS
import './style.scss';

// boilerplate to create store with reducers and initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// AUTH upon loading if a `token` is already present
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

// we now wrap App in a Provider
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('main'));
