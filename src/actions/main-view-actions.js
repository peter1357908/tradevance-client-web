export const MainViewActionTypes = {
  SET_SEARCH_STRING: 'SET_SEARCH_STRING',
  SET_CHARTING_TABS: 'SET_CHARTING_TABS',
  SET_ACTIVE_CHARTING_TAB: 'SET_ACTIVE_CHARTING_TAB',
};

export function setSearchString(searchString) {
  return (dispatch) => {
    console.log('inside setSearchString dispatch');
    console.log(searchString);
    dispatch({
      type: MainViewActionTypes.SET_SEARCH_STRING,
      searchString,
    });
  };
}

export function setChartingTabs(tabsArray) {
  return (dispatch) => {
    dispatch({
      type: MainViewActionTypes.SET_CHARTING_TABS,
      chartingTabs: tabsArray,
    });
  };
}

export function setActiveChartingTab(tabString) {
  return (dispatch) => {
    dispatch({
      type: MainViewActionTypes.SET_ACTIVE_CHARTING_TAB,
      activeChartingTab: tabString,
    });
  };
}
