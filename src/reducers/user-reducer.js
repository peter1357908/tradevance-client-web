import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  profile: {}, // not `null`...
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, profile: action.user };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, profile: {} };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false, profile: {} };
    default:
      return state;
  }
};

export default UserReducer;
