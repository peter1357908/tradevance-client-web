import axios from 'axios';
import { routePaths, API_ROOT_URL } from '../global-variables';

import { authError, axiosError } from './error-actions';

export const UserActionTypes = {
  SET_AUTH: 'SET_AUTH',
  SET_PROFILE: 'SET_PROFILE',
  DEAUTH: 'DEAUTH',
};

// delete token from localStorage and update states accordingly
// if no rediction needed, input null for history or redirectRoute
export function signOutUser(history, redirectRoute) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: UserActionTypes.DEAUTH });
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
        history.push(routePaths.MyProfile);
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Unable to sign in: ${error.response.data}`));
        } else {
          dispatch(axiosError(error));
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
        history.push(routePaths.MyProfile);
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Unable to sign up: ${error.response.data}`));
        } else {
          dispatch(axiosError(error));
        }
      });
  };
}

// expects an existing token; otherwise dispatches an authError (shouldn't happen).
// fetches and populates the profile state and does nothing else
// (i.e. does not SET_AUTH; expected authenticated===true)
// if fails; sign out user (in case of expired token...?)
export function fetchOwnProfile(token) {
  return (dispatch) => {
    if (token === null) {
      dispatch(authError('Attempted to fetchOwnProfile() without a token'));
    } else {
      axios.get(`${API_ROOT_URL}/own-profile`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: UserActionTypes.SET_PROFILE, profile: response.data.user });
        })
        .catch((error) => {
          if (error.response.data) {
            dispatch(authError(`Unable to fetch own profile: ${error.response.data}`));
            signOutUser(null, null)(dispatch);
          } else {
            dispatch(axiosError(error));
          }
        });
    }
  };
}
