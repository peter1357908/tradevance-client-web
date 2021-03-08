export const ErrorActionTypes = {
  AUTH_ERROR: 'AUTH_ERROR',
  AXIOS_ERROR: 'AXIOS_ERROR',
};

export function authError(error) {
  return (dispatch) => {
    dispatch({
      type: ErrorActionTypes.AUTH_ERROR,
      error,
    });
  };
}

export function axiosError(error) {
  return (dispatch) => {
    dispatch({
      type: ErrorActionTypes.AXIOS_ERROR,
      error,
    });
  };
}
