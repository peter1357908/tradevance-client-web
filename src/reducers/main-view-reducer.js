import { MainViewActionTypes } from '../actions/main-view-actions';

const initialState = {
  searchString: 'AAPL', // determine the first ever charting tab opened

  chartingTabs: [],
  activeChartingTab: '',
};

const MainViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case MainViewActionTypes.SET_SEARCH_STRING:
      console.log('inside main view reducer');
      return { ...state, searchString: action.searchString };
    case MainViewActionTypes.SET_CHARTING_TABS:
      return { ...state, chartingTabs: action.chartingTabs };
    case MainViewActionTypes.SET_ACTIVE_CHARTING_TAB:
      return { ...state, activeChartingTab: action.activeChartingTab };
    default:
      return state;
  }
};

export default MainViewReducer;
