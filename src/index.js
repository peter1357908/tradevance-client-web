import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers'; // The magic starts here...
import App from './components/app';

import './style.scss';

// boilerplate to create store with reducers and initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// we now wrap App in a Provider
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('main'));
