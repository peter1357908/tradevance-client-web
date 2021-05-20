export const ErrorActionTypes = {
  AUTH_ERROR: 'ERROR/AUTH_ERROR',
  AXIOS_ERROR: 'ERROR/AXIOS_ERROR',
};

// authError just reports the error; it does not automatically sign out
// the current user (some auth errors like sign-in errors should not
// trigger a de-authentication)
export function authError(error) {
  console.log(error);
  return (dispatch) => {
    dispatch({
      type: ErrorActionTypes.AUTH_ERROR,
      error,
    });
  };
}

export function axiosError(error) {
  console.log(error);
  return (dispatch) => {
    dispatch({
      type: ErrorActionTypes.AXIOS_ERROR,
      error,
    });
  };
}
