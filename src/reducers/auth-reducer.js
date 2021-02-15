import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  username: '', // not `null`...
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, username: action.username };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, username: '' };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false, username: '' };
    default:
      return state;
  }
};

export default AuthReducer;
