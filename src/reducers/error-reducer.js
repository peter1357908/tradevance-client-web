import { ErrorActionTypes } from '../actions/error-actions';

const initialState = {
  error: 'No error yet - except that this message should not be visible.',
};

// TODO: object spread operator?
const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ErrorActionTypes.AUTH_ERROR:
      return { ...state, error: action.error };
    case ErrorActionTypes.AXIOS_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default ErrorReducer;
