import axios from 'axios';
import { API_ROOT_URL } from '../../global-variables';

import { authError, axiosError } from '../error-actions';

import { signOutUser } from '../root-actions';

export const WatchlistActionTypes = {
  SET_WATCHLISTS: 'RROFILE/WATCHLIST/SET_WATCHLISTS',
  SET_WATCHLIST: 'PROFILE/WATCHLIST/SET_WATCHLIST',
  ADD_WATCHLIST: 'PROFILE/WATCHLIST/ADD_WATCHLIST',
};

export function fetchWatchlists() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to fetch watchlists without a token')(dispatch);
    } else {
      axios.get(`${API_ROOT_URL}/watchlists`, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: WatchlistActionTypes.SET_WATCHLISTS, watchlists: response.data.watchlists });
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

export function addWatchlist(name) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to add a watchlist without a token')(dispatch);
    } else {
      axios.post(`${API_ROOT_URL}/watchlists`, { name }, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: WatchlistActionTypes.ADD_WATCHLIST, watchlist: response.data.watchlist });
        })
        .catch((error) => {
          console.log(error);
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

// input `null` for `name` or `symbols` to signal `no update` for that respective field
export function updateWatchlist(_id, name, symbols) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token === null) {
      authError('Attempted to update a watchlist without a token')(dispatch);
    } else {
      axios.put(`${API_ROOT_URL}/watchlists/${_id}`, { name, symbols }, { headers: { authorization: token } })
        .then((response) => {
          dispatch({ type: WatchlistActionTypes.SET_WATCHLIST, watchlist: response.data.watchlist });
        })
        .catch((error) => {
          console.log(error);
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

// is this even meaninful? Uncomment when needed; server-side update also required.
// export function fetchWatchlist(_id) {
//   const token = localStorage.getItem('token');
//   return (dispatch) => {
//     if (token === null) {
//       authError('Attempted to fetch watchlist without a token')(dispatch);
//     } else {
//       axios.get(`${API_ROOT_URL}/watchlists/${_id}`, { headers: { authorization: token } })
//         .then((response) => {
//           dispatch({ type: WatchlistActionTypes.SET_WATCHLIST, watchlist: response.data.watchlist });
//         })
//         .catch((error) => {
//           if (error.response.data) {
//             authError(`Unable to fetch watchlist: ${error.response.data}`)(dispatch);
//             signOutUser(null, null)(dispatch);
//           } else {
//             axiosError(error)(dispatch);
//           }
//         });
//     }
//   };
// }

// TODO: implement and uncomment... needs server-side support
// export function addSymbolsToWatchlist(_id, newSymbols) {
//   const token = localStorage.getItem('token');
//   return (dispatch) => {
//     if (token === null) {
//       authError('Attempted to add symbols to watchlist without a token')(dispatch);
//     } else {
//       axios.put(`${API_ROOT_URL}/watchlists/${_id}`, { newSymbols }, { headers: { authorization: token } })
//         .then((response) => {
//           dispatch({ type: WatchlistActionTypes.SET_WATCHLIST, watchlist: response.data.watchlist });
//         })
//         .catch((error) => {
//           if (error.response.data) {
//             authError(`Unable to add symbols to watchlist: ${error.response.data}`)(dispatch);
//             signOutUser(null, null)(dispatch);
//           } else {
//             axiosError(error)(dispatch);
//           }
//         });
//     }
//   };
// }
