import { WatchlistActionTypes } from '../../actions/profile-actions/watchlist-actions';

const initialState = {
  watchlists: [],
};

const getStateAfterSettingWatchlist = (state, watchlist) => {
  const { watchlists } = state;
  let isFound = false;

  // loop through the original array, if the watchlist has a
  // previous state, update it.
  for (let i = 0; i < watchlists.length; i += 1) {
    if (watchlists[i]._id === watchlist._id) {
      watchlists[i] = watchlist;
      isFound = true;
      break;
    }
  }

  // To be safe, if the watchlist did not have a previous state, add it
  // to the array of watchlists. This may be the case, for example,
  // when two browser windows are open and one of them is outdated in terms
  // of the Redux state...
  if (!isFound) { watchlists.push(watchlist); }

  console.log(`${JSON.stringify({ ...state, watchlists })}`);

  return { ...state, watchlists };
};

const WatchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WatchlistActionTypes.SET_WATCHLISTS:
      return { ...state, watchlists: action.watchlists };
    case WatchlistActionTypes.SET_WATCHLIST:
      return getStateAfterSettingWatchlist(state, action.watchlist);
    case WatchlistActionTypes.ADD_WATCHLIST:
      return { ...state, watchlists: [...state.watchlists, action.watchlist] };
    default:
      return state;
  }
};

export default WatchlistReducer;
