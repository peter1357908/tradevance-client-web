import { MainViewActionTypes } from '../actions/main-view-actions';

const initialState = {
  // contains ChartingTab object references
  chartingTabs: [],

  // activeChartingTabIndex===-1 only when chartingTabs.length===0
  activeChartingTabIndex: -1,
};

// abstracted-out reducer functions for more readable code; functions
// are named according to their ActionType
// ==================================================================

// this function assumes valid input (empty array or array of valid indices).
// the input array `indices` will be sorted inside the function.
// there are many ways to achieve the desired result, but
// I'll not let pre-mature optimization get the better of me...
const getStateAfterRemovingChartingTabsByIndices = (state, indices) => {
  const { chartingTabs, activeChartingTabIndex } = state;
  indices.sort();

  let targetIndex = indices.shift();
  const newChartingTabs = [];
  let newActiveChartingTabIndex = activeChartingTabIndex;

  // loop through the original array,
  // if the element is not to be removed, add it to the new array
  for (let i = 0; i < chartingTabs.length; i += 1) {
    // if all relevant indices have been examined, just copy the rest
    // of the elements
    if (!targetIndex) {
      while (i < chartingTabs.length) {
        newChartingTabs.push(chartingTabs[i]);
        i += 1;
      }
      break;
    }

    if (i !== targetIndex) {
      newChartingTabs.push(chartingTabs[i]);
    } else {
      // if an element before the active element or the active element
      // itself is to be removed, update the index accordingly
      if (targetIndex <= activeChartingTabIndex) {
        newActiveChartingTabIndex -= 1;
      }

      targetIndex = indices.shift();
    }
  }

  // if the active element was the first element and was removed,
  // we would get -1 as the new index; make the (new) last element active
  // (which may still be -1 if the array is now empty)
  if (newActiveChartingTabIndex < 0) {
    newActiveChartingTabIndex = newChartingTabs.length - 1;
  }

  return {
    ...state,
    chartingTabs: newChartingTabs,
    activeChartingTabIndex: newActiveChartingTabIndex,
  };
};

// the actual reducer
// ==================================================================
const MainViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case MainViewActionTypes.SET_ACTIVE_CHARTING_TAB_INDEX:
      return { ...state, activeChartingTabIndex: action.activeChartingTabIndex };
    case MainViewActionTypes.ADD_CHARTING_TABS:
      // also make the last tab active
      return {
        ...state,
        chartingTabs: [...state.chartingTabs, ...action.newChartingTabs],
        activeChartingTabIndex: state.activeChartingTabIndex + action.newChartingTabs.length,
      };
    case MainViewActionTypes.REMOVE_CHARTING_TABS_BY_INDICES:
      return getStateAfterRemovingChartingTabsByIndices(state, action.indices);
    default:
      return state;
  }
};

export default MainViewReducer;
