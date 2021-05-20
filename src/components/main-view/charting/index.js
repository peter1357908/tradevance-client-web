import React from 'react';
import { NavLink } from 'react-router-dom';

import Chart from './chart';
import SymbolSearchBar from '../../symbol-search-bar';
import ChartingTabs from './charting-tabs';
import ToolPillar from './tool-pillar';

import cssVariables from '../../../style.scss';
import { routePaths } from '../../../global-variables';

const Charting = (props) => {
  const leftContainerWidth = 50; // in px - fixed length
  const searchBarAndTabsContainerHeight = 50; // in px - fixed length
  const spaceBetween = 15; // in px, realized by margin/padding
  const defaultLineThickness = parseInt(cssVariables.defaultLineThickness, 10);

  // TODO: find a more consistent way to style the border lines
  const styles = {
    charting: {
      display: 'flex',

      width: '100%',
      height: '100%',

      padding: `${spaceBetween}px`,
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',

      width: `${leftContainerWidth}px`,
      height: '100%',

      marginRight: `${spaceBetween}px`,

      flexGrow: '0',
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',

      height: '100%',

      flexGrow: '1',
    },
    profilePictureContainer: {
      width: `${leftContainerWidth}px`,
      height: `${leftContainerWidth}px`,

      backgroundColor: cssVariables.bgGrey,

      border: cssVariables.defaultBorder,
      borderRadius: cssVariables.defaultBorderRadius,

      marginBottom: `${spaceBetween}px`,

      flexGrow: '0',
    },
    toolPillarContainer: {
      width: '100%',

      flexGrow: '1',

      border: cssVariables.defaultBorder,
      borderRadius: cssVariables.defaultBorderRadius,
    },
    searchBarAndTabsContainer: {
      display: 'flex',

      width: '100%',
      height: `${searchBarAndTabsContainerHeight}px`,

      flexGrow: '0',
    },
    searchBar: {
      width: '250px',
      height: `${searchBarAndTabsContainerHeight * 0.8}px`,

      marginRight: `${spaceBetween}px`,

      flexGrow: '0',
    },
    tabsContainer: {
      height: '100%',

      // the shift is to accommodate the effect of styling with outlines
      paddingRight: `${spaceBetween + defaultLineThickness}px`,

      flexGrow: '1',
    },
    chartContainer: {
      width: '100%',

      flexGrow: '1',

      border: cssVariables.defaultBorder,
      borderRadius: cssVariables.defaultBorderRadius,
    },

  };

  return (
    <div style={styles.charting}>
      <div style={styles.leftContainer}>
        <NavLink to={routePaths.Profile} style={styles.profilePictureContainer}>
          {/* profile picture */}
        </NavLink>
        <div style={styles.toolPillarContainer}>
          <ToolPillar />
        </div>
      </div>
      <div style={styles.rightContainer}>
        <div style={styles.searchBarAndTabsContainer}>
          <SymbolSearchBar
            searchBarStyle={styles.searchBar}
          />
          <div style={styles.tabsContainer}>
            <ChartingTabs />
          </div>
        </div>
        <div style={styles.chartContainer}>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Charting;
