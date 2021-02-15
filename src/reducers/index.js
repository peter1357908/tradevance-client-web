// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
