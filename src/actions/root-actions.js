export const RootActionTypes = {
  RESET_ALL: 'ROOT/RESET_ALL',
};

// delete token from localStorage and purge the local data from the last
// user (clear states) via the "ROOT/RESET_ALL" action type
// if no rediction needed, input null for history or redirectRoute
export function signOutUser(history, redirectRoute) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: RootActionTypes.RESET_ALL });
    if (history !== null && redirectRoute !== null) {
      history.push(redirectRoute);
    }
    // uncomment to force a page refresh to be ultra-safe
    // window.location.reload();
  };
}
