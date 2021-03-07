/* all the API calls happen in action creators
 */
import axios from 'axios';
import routePaths from '../route-paths';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://tradevance.herokuapp.com/api';
// TODO: make the above dependent on environment variable (whether development or production)

export const ActionTypes = {
  // user-reducer actions
  SET_AUTH: 'SET_AUTH',
  SET_PROFILE: 'SET_PROFILE',
  DEAUTH: 'DEAUTH',

  // error-reducers
  AUTH_ERROR: 'AUTH_ERROR', // also handled by error-reducer
};

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    error,
  };
}

export function axiosError(error) {
  return {
    type: ActionTypes.AXIOS_ERROR,
    error,
  };
}

// delete token from localStorage and update states accordingly
// if no rediction needed, input null for history or redirectRoute
export function signOutUser(history, redirectRoute) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH });
    if (history !== null && redirectRoute !== null) {
      history.push(redirectRoute);
    }
  };
}

export function signInUser({ username, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/sign-in`, { username, password })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_PROFILE, profile: response.data.user });
        dispatch({ type: ActionTypes.SET_AUTH, authenticated: true });
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
    axios.post(`${ROOT_URL}/sign-up`, { username, password, email })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_PROFILE, profile: response.data.user });
        dispatch({ type: ActionTypes.SET_AUTH, authenticated: true });
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
      axios.get(`${ROOT_URL}/own-profile`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: ActionTypes.SET_PROFILE, profile: response.data.user });
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
