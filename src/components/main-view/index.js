import React from 'react';

import FlexView from 'react-flexview';

import Charting from './charting';
import Modules from './modules';
import Models from './models';
import ManualOrder from './manual-order';

import cssVariables from '../../style.scss';

const MainView = (props) => {
  const leftContainerRatio = 70; // in percentage with respect to width
  const chartingContainerRatio = 60; // in percentage with respect to height
  const modelsContainerRatio = 50; // in percentage with respect to height

  // TODO: find a more consistent way to style the border lines
  const styles = {
    mainView: {
      width: '100vw',
      height: '100vh',
    },
    leftContainer: {
      width: `${leftContainerRatio}%`,
      height: '100%',

      borderRight: cssVariables.defaultBorder,
    },
    rightContainer: {
      width: `${100 - leftContainerRatio}%`,
      height: '100%',
    },
    chartingContainer: {
      width: '100%',
      height: `${chartingContainerRatio}%`,

      borderBottom: cssVariables.defaultBorder,
    },
    modulesContainer: {
      width: '100%',
      height: `${100 - chartingContainerRatio}%`,
    },
    modelsContainer: {
      width: '100%',
      height: `${modelsContainerRatio}%`,

      borderBottom: cssVariables.defaultBorder,
    },
    manualOrderContainer: {
      width: '100%',
      height: `${100 - modelsContainerRatio}%`,
    },

  };

  return (
    <FlexView style={styles.mainView}>
      <FlexView column style={styles.leftContainer}>
        <div style={styles.chartingContainer}>
          <Charting />
        </div>
        <div style={styles.modulesContainer}>
          <Modules />
        </div>
      </FlexView>
      <FlexView column style={styles.rightContainer}>
        <div style={styles.modelsContainer}>
          <Models />
        </div>
        <div style={styles.manualOrderContainer}>
          <ManualOrder />
        </div>
      </FlexView>
    </FlexView>
  );
};

export default MainView;
