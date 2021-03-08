import React from 'react';
import { NavLink } from 'react-router-dom';

import Chart from './chart';
import SearchBar from './search-bar';
import Tabs from './tabs';
import ToolPillar from './tool-pillar';

import cssVariables from '../../../style.scss';
import { routePaths } from '../../../global-variables';

const Charting = (props) => {
  const leftContainerWidth = 50; // in px - fixed length
  const searchBarContainerWidth = 250; // in px - fixed length

  const spaceBetween = 15; // in px, realized by margin/padding

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
      // since we expect a square logo, this lines the divider up
      // with the top of the toolPillarContainer
      height: `${leftContainerWidth + spaceBetween}px`,

      flexGrow: '0',
    },
    searchBarContainer: {
      width: `${searchBarContainerWidth}px`,
      // again, becacuse we expect a square logo
      height: `${leftContainerWidth}px`,

      marginRight: `${spaceBetween}px`,

      flexGrow: '0',
    },
    tabsContainer: {
      height: '100%',

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
        <NavLink to={routePaths.MyProfile} style={styles.profilePictureContainer}>
          {/* profile picture */}
        </NavLink>
        <div style={styles.toolPillarContainer}>
          <ToolPillar />
        </div>
      </div>
      <div style={styles.rightContainer}>
        <div style={styles.searchBarAndTabsContainer}>
          <div style={styles.searchBarContainer}>
            <SearchBar />
          </div>
          <div style={styles.tabsContainer}>
            <Tabs />
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
