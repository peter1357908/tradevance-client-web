import { AuthActionTypes } from '../actions/auth-actions';

const initialState = {
  // note that `authenticated===true` just means that we should render as if
  // a user is signed in - it does not mean that other Redux states have been
  // populated already (for example, the `profile` states may not have been fetched)
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return { ...state, authenticated: action.authenticated };
    default:
      return state;
  }
};

export default AuthReducer;
