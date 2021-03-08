import { ErrorActionTypes } from '../actions/error-actions';

const initialState = {
  error: 'No error yet - except that this message is erroneously printed.',
};

// TODO: object spread operator?
const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ErrorActionTypes.AUTH_ERROR:
      console.log(action.error);
      return { ...state, error: action.error };
    case ErrorActionTypes.AXIOS_ERROR:
      console.log(action.error);
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default ErrorReducer;
