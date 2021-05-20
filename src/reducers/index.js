// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';
import OverviewReducer from './profile-reducers/overview-reducer';
import WatchlistReducer from './profile-reducers/watchlist-reducer';
import MainViewReducer from './main-view-reducer';

import { RootActionTypes } from '../actions/root-actions';

const appReducer = combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,

  // profile reducers
  overview: OverviewReducer,
  watchlist: WatchlistReducer,

  // mainview reducers
  mainView: MainViewReducer,
});

// reset all states to their respective initial state
// credit: https://stackoverflow.com/a/35641992
// note that this relies on the states actually having initial states
// either via ES6's default function input or via an explicit check
// for `undefined` input in the reducer. (this code uses the ES6 approach)

const rootReducer = (state, action) => {
  if (action.type === RootActionTypes.RESET_ALL) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
