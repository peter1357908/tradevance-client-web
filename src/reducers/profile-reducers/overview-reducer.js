import { OverviewActionTypes } from '../../actions/profile-actions/overview-actions';

// the design of this state object follows what is returned by the API call
// that gets the overview.
const initialState = {
  username: '',
  numFollowers: 0,
  numFollowing: 0,
  numLikes: 0,
  subscriptionName: '',
  joinedTimeAgo: '',
};

const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case OverviewActionTypes.SET_OVERVIEW:
      // to be honest, `return action.overview` should be sufficient
      return { ...state, ...action.overview };
    default:
      return state;
  }
};

export default OverviewReducer;
