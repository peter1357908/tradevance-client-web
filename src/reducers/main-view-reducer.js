import { ActionTypes } from '../actions';

const initialState = {
  chartingTabs: [],
  activeChartingTab: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHARTING_TABS:
      return { ...state, chartingTabs: action.chartingTabs };
    case ActionTypes.SET_ACTIVE_CHARTING_TAB:
      return { ...state, activeChartingTab: action.activeChartingTab };
    default:
      return state;
  }
};

export default UserReducer;
