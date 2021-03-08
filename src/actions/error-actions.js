export const ErrorActionTypes = {
  AUTH_ERROR: 'AUTH_ERROR',
  AXIOS_ERROR: 'AXIOS_ERROR',
};

export function authError(error) {
  return {
    type: ErrorActionTypes.AUTH_ERROR,
    error,
  };
}

export function axiosError(error) {
  return {
    type: ErrorActionTypes.AXIOS_ERROR,
    error,
  };
}
