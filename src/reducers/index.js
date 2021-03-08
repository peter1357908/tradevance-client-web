// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import ErrorReducer from './error-reducer';
import MainViewReducer from './main-view-reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  error: ErrorReducer,
  mainView: MainViewReducer,
});

export default rootReducer;
