import { UserActionTypes } from '../actions/user-actions';

const initialState = {
  // note that authenticated===true just means that we should render as if
  // a user is signed in - it does not mean that the profile state below is
  // populated with the latest information or any information at all
  authenticated: false,
  // profile state should have the same structure as the JSON object
  // fetched from the API server. This is to avoid any null access into
  // an element before the relevant data is fetched (so the renderer
  // renders nothing instead of crash the app with a null access)
  profile: {
    auth: {
      username: '',
      // password - even its hashed and salted version - is not fetched
    },

    profile: {
      email: '',
      profilePictureUrl: '',
      description: '',
      website: '',
      company: '',

      emailIsVerified: false,
    },

    social: {
      following: [],
      followers: [],
      ownPosts: [],
      starredPosts: [],
      ownComments: [],

      likeCount: {
        post: 0,
        comment: 0,
        strategy: 0,
        model: 0,
        script: 0,
      },
    },

    messages: {
      inbox: [],
      sent: [],
    },

    watchlists: [],

    notes: [],

    alerts: [],

    subscription: {
      plan: '',
      fromDate: '',
      toDate: '',
      billingFrequency: 0,
      autoRenew: false,

    },

    simulatedAccounts: [],

    ideas: {
      own: {
        strategies: [],
        models: [],
        scripts: [],
      },

      starred: {
        strategies: [],
        models: [],
        scripts: [],
      },
    },

    billing: {
      cardNumber: '',
      expirationMonth: 1, // 1 - 12
      expirationYear: 0,
      cardHolderName: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
    },

    privacy: {
      showFollowers: false,
      showFollowing: false,
    },

    notificationPreference: {
      alert: '',
      message: '',
      comment: '',
      follower: '',
      system: '',
    },

    createdAt: '', // convert to Date object by `new Date(createdAt)`
    updatedAt: '',

    id: '', // the MongoDB Document ID
  },
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_AUTH:
      return { ...state, authenticated: action.authenticated };
    case UserActionTypes.SET_PROFILE:
      // only update the parts that are present in the action
      return { ...state, profile: { ...state.profile, ...action.profile } };
    case UserActionTypes.DEAUTH:
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
