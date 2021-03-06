import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'; // The magic starts here...
import App from './components/app';
import { ActionTypes, fetchOwnProfile } from './actions';

import 'bootstrap/dist/css/bootstrap.css'; // import bootstrap before custom CSS
import './style.scss';

// boilerplate to create store with reducers and initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// AUTH upon loading if a `token` is already present
// note that fetchOwnProfile() returns a function that takes in a `dispatch` as argument
const token = localStorage.getItem('token');
if (token) {
  // need to mark as authenticated first, before trying to fetch data (otherwise, for example,
  // a PrivateRoute is rendered first and gets the user redirected to sign-in...)
  store.dispatch({ type: ActionTypes.SET_AUTH, authenticated: true });
  fetchOwnProfile(token)(store.dispatch);
}

// we now wrap App in a Provider
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('main'));
