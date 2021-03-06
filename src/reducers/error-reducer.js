import { ActionTypes } from '../actions';

const initialState = {
  error: null,
};

// TODO: object spread operator?
const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AXIOS_ERROR:
      console.log(action.error);
      return { ...state, error: action.error };
    case ActionTypes.AUTH_ERROR:
      console.log(action.error);
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default ErrorReducer;
