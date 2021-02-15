/* all the API calls happen in action creators
 */
import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-lab5-crud-api-server.herokuapp.com/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
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

export function signinUser({ username, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { username, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, username });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Sign Up Failed: ${error.response.data}`));
        } else {
          dispatch({ type: ActionTypes.AXIOS_ERROR, error });
        }
      });
  };
}

export function signupUser({ username, email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { username, email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, username });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(authError(`Sign Up Failed: ${error.response.data}`));
        } else {
          dispatch({ type: ActionTypes.AXIOS_ERROR, error });
        }
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
