/* all the API calls happen in action creators
 */
import axios from 'axios';
import routePaths from '../route-paths';

const ROOT_URL = 'http://localhost:9090/api';
// TODO: make the above dependent on environment variable (whether development or production)

export const ActionTypes = {
  // user-reducer actions
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR', // also handled by error-reducer
};

// will cause de-authentication like signoutUser() below
// TODO: think about when de-authentication is really necessary (i.e.
// when to dispatch authError() instead of AXIOS_ERROR)
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    error,
  };
}

export function signInUser({ username, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/sign-in`, { username, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, user: response.data.user });
        localStorage.setItem('token', response.data.token);
        history.push(routePaths.MyProfile);
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Unable to sign in: ${error.response.data}`));
        } else {
          dispatch({ type: ActionTypes.AXIOS_ERROR, error });
        }
      });
  };
}

export function signUpUser({ username, password, email }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/sign-up`, { username, password, email })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, user: response.data.user });
        localStorage.setItem('token', response.data.token);
        history.push(routePaths.MyProfile);
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Unable to sign up: ${error.response.data}`));
        } else {
          dispatch({ type: ActionTypes.AXIOS_ERROR, error });
        }
      });
  };
}

// expects a non-null token from `localStorage.getItem('token')`;
// conveniently relies on the AUTH_USER action
export function fetchOwnProfile(token) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/own-profile`, { headers: { authorization: token } })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, user: response.data.user });
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Unable to fetch own profile: ${error.response.data}`));
        } else {
          dispatch({ type: ActionTypes.AXIOS_ERROR, error });
        }
      });
  };
}

// delete token from localStorage and update state accordingly
// if no rediction needed, input null for history or redirectRoute
export function signOutUser(history, redirectRoute) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    if (history !== null && redirectRoute !== null) {
      history.push(redirectRoute);
    }
  };
}
