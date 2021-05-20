import axios from 'axios';
import { API_ROOT_URL } from '../../global-variables';

import { authError, axiosError } from '../error-actions';
import { signOutUser } from '../root-actions';

export const OverviewActionTypes = {
  SET_OVERVIEW: 'PROFILE/OVERVIEW/SET_OVERVIEW',
};

// expects an existing token; otherwise dispatches an authError (shouldn't happen).
// TOTHINK (maybe just do nothing, so the function is less specific?)
// fetches and updates the overview state and does nothing else
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
          dispatch({ type: OverviewActionTypes.SET_OVERVIEW, overview: response.data });
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
