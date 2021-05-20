import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'; // The magic starts here...
import App from './components/app';
import { AuthActionTypes } from './actions/auth-actions';
import { fetchOverview } from './actions/profile-actions/overview-actions';

import 'bootstrap/dist/css/bootstrap.css'; // import bootstrap before custom CSS
import './style.scss';

// boilerplate to create store with reducers and initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// AUTH upon loading if a `token` is already present
// note that fetchOverview() returns a function that takes in a `dispatch` as argument
const token = localStorage.getItem('token');
if (token !== null) {
  // need to mark as authenticated first, before trying to fetch data
  store.dispatch({ type: AuthActionTypes.SET_AUTH, authenticated: true });
  fetchOverview()(store.dispatch);
}

// we now wrap App in a Provider
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('main'));
