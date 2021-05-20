import axios from 'axios';
import { routePaths, API_ROOT_URL } from '../global-variables';

import { authError, axiosError } from './error-actions';
import { fetchOverview } from './profile-actions/overview-actions';

export const AuthActionTypes = {
  SET_AUTH: 'AUTH/SET_AUTH',
};

// note the sign-out function is a root action for two reasons:
// 1. to avoid cyclical dependence between action creators
// 2. the sign-out function will reset all Redux states

export function signInUser({ username, password }, history) {
  return (dispatch) => {
    axios.post(`${API_ROOT_URL}/sign-in`, { username, password })
      .then((response) => {
        dispatch({ type: AuthActionTypes.SET_AUTH, authenticated: true });
        localStorage.setItem('token', response.data.token);
        fetchOverview(); // should only be called after the token is stored in the local storage
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
        dispatch({ type: AuthActionTypes.SET_AUTH, authenticated: true });
        localStorage.setItem('token', response.data.token);
        fetchOverview(); // should only be called after the token is stored in the local storage
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
