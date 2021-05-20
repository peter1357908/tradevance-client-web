// this is legacy code for reference in future coding; not actually used.

import axios from 'axios';
import { routePaths, API_ROOT_URL } from '../global-variables';

import { authError, axiosError } from './error-actions';
import { MainViewActionTypes } from './main-view-actions';

export const UserActionTypes = {
  SET_AUTH: 'SET_AUTH',
  SET_PROFILE: 'SET_PROFILE',
  DEAUTH: 'DEAUTH',

  SET_WATCHLIST: 'SET_WATCHLIST',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
};

// delete token from localStorage and purge the local data from the last
// user (clear states)
// if no rediction needed, input null for history or redirectRoute
export function signOutUser(history, redirectRoute) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: UserActionTypes.DEAUTH });
    dispatch({ type: MainViewActionTypes.RESET_MAIN_VIEW });
    if (history !== null && redirectRoute !== null) {
      history.push(redirectRoute);
    }
  };
}

export function signInUser({ username, password }, history) {
  return (dispatch) => {
    axios.post(`${API_ROOT_URL}/sign-in`, { username, password })
      .then((response) => {
        dispatch({ type: UserActionTypes.SET_PROFILE, profile: response.data.user });
        dispatch({ type: UserActionTypes.SET_AUTH, authenticated: true });
        localStorage.setItem('token', response.data.token);
        history.push(routePaths.Profile);
      })
      .catch((error) => {
        if (error.response.data) {
          authError(`Unable to sign in: ${error.response.data}`)(dispatch);
        } else {
          axiosError(error)(dispatch);
        }
      });
  };
}

export function signUpUser({ username, password, email }, history) {
  return (dispatch) => {
    axios.post(`${API_ROOT_URL}/sign-up`, { username, password, email })
      .then((response) => {
        dispatch({ type: UserActionTypes.SET_PROFILE, profile: response.data.user });
        dispatch({ type: UserActionTypes.SET_AUTH, authenticated: true });
        localStorage.setItem('token', response.data.token);
        history.push(routePaths.Profile);
      })
      .catch((error) => {
        if (error.response.data) {
          authError(`Unable to sign up: ${error.response.data}`)(dispatch);
        } else {
          axiosError(error)(dispatch);
        }
      });
  };
}

// expects an existing token; otherwise dispatches an authError (shouldn't happen).
// TOTHINK (maybe just do nothing, so the function is less specific?)
// fetches and updates the profile state and does nothing else
// (i.e. does not SET_AUTH; expected authenticated===true)
// if fails; sign out user (in case of expired token...?)
export function fetchOverview() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to fetch overview without a token')(dispatch);
    } else {
      axios.get(`${API_ROOT_URL}/overview`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.SET_PROFILE, profile: response.data.user });
        })
        .catch((error) => {
          if (error.response.data) {
            authError(`Unable to fetch overview: ${error.response.data}`)(dispatch);
            signOutUser(null, null)(dispatch);
          } else {
            axiosError(error)(dispatch);
          }
        });
    }
  };
}

export function fetchWatchlists() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to fetch watchlists without a token')(dispatch);
    } else {
      axios.get(`${API_ROOT_URL}/watchlists`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.SET_PROFILE, profile: { watchlists: response.data.watchlists } });
        })
        .catch((error) => {
          if (error.response.data) {
            authError(`Unable to fetch watchlists: ${error.response.data}`)(dispatch);
            signOutUser(null, null)(dispatch);
          } else {
            axiosError(error)(dispatch);
          }
        });
    }
  };
}

export function fetchWatchlist(_id) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to fetch watchlist without a token')(dispatch);
    } else {
      axios.get(`${API_ROOT_URL}/watchlists/${_id}`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.SET_WATCHLIST, watchlist: response.data.watchlist });
        })
        .catch((error) => {
          if (error.response.data) {
            authError(`Unable to fetch watchlist: ${error.response.data}`)(dispatch);
            signOutUser(null, null)(dispatch);
          } else {
            axiosError(error)(dispatch);
          }
        });
    }
  };
}

export function addWatchlist(name) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to add watchlist without a token')(dispatch);
    } else {
      axios.post(`${API_ROOT_URL}/watchlists`, { name }, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.ADD_WATCHLIST, watchlist: response.data.watchlist });
        })
        .catch((error) => {
          if (error.response.data) {
            authError(`Unable to add watchlist: ${error.response.data}`)(dispatch);
            signOutUser(null, null)(dispatch);
          } else {
            axiosError(error)(dispatch);
          }
        });
    }
  };
}

export function addSymbolsToWatchlist(_id, newSymbols) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to add symbols to watchlist without a token')(dispatch);
    } else {
      axios.get(`${API_ROOT_URL}/watchlists/${_id}`, { newSymbols }, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.SET_WATCHLIST, watchlist: response.data.watchlist });
        })
        .catch((error) => {
          if (error.response.data) {
            authError(`Unable to add symbols to watchlist: ${error.response.data}`)(dispatch);
            signOutUser(null, null)(dispatch);
          } else {
            axiosError(error)(dispatch);
          }
        });
    }
  };
}
