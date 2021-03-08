export const MainViewActionTypes = {
  SET_CHARTING_TABS: 'SET_CHARTING_TABS',
  SET_ACTIVE_CHARTING_TAB: 'SET_ACTIVE_CHARTING_TAB',
};

export function setChartingTabs(tabsArray) {
  return {
    type: MainViewActionTypes.SET_CHARTING_TABS,
    chartingTabs: tabsArray,
  };
}

export function setActiveChartingTab(tabString) {
  return {
    type: MainViewActionTypes.SET_ACTIVE_CHARTING_TAB,
    activeChartingTab: tabString,
  };
}
