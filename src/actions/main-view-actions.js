import ChartingTabObject from '../components/main-view/charting/charting-tab-object';

export const MainViewActionTypes = {
  SET_ACTIVE_CHARTING_TAB_INDEX: 'SET_ACTIVE_CHARTING_TAB_INDEX',
  ADD_CHARTING_TABS: 'ADD_CHARTING_TABS',
  REMOVE_CHARTING_TABS_BY_INDICES: 'REMOVE_CHARTING_TABS_BY_INDICES',

  RESET_MAIN_VIEW: 'RESET_MAIN_VIEW',
};

export function setActiveChartingTabIndex(tabIndex) {
  return (dispatch) => {
    dispatch({
      type: MainViewActionTypes.SET_ACTIVE_CHARTING_TAB_INDEX,
      activeChartingTabIndex: tabIndex,
    });
  };
}

// expects an array of new references to ChartingTab objects
// will also update activeChartingTabIndex, via the reducer
export function addChartingTabs(newChartingTabs) {
  return (dispatch) => {
    dispatch({
      type: MainViewActionTypes.ADD_CHARTING_TABS,
      newChartingTabs,
    });
  };
}

// expects an array of symbol strings; wraps around addChartingTabs()
export function addChartingTabsBySymbols(newSymbols) {
  const newChartingTabs = [];
  newSymbols.forEach((newSymbol) => {
    // only add if the symbol is an non-empty string...
    if (newSymbol !== '') {
      newChartingTabs.push(new ChartingTabObject(newSymbol));
    }
  });
  return addChartingTabs(newChartingTabs);
}

// expects a (unsorted) array of indices (for the ChartingTabs to be removed)
// expects valid input (empty array or array of valid indices)
export function removeChartingTabsByIndices(indices) {
  return (dispatch) => {
    dispatch({
      type: MainViewActionTypes.REMOVE_CHARTING_TABS_BY_INDICES,
      indices,
    });
  };
}
