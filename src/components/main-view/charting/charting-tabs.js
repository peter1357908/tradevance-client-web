import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlexView from 'react-flexview';

import cssVariables from '../../../style.scss';

// import {  } from '../actions/user-actions';

function mapStateToProps(reduxState) {
  return {
    tabs: reduxState.mainView.chartingTabs,
    activeIndex: reduxState.mainView.activeChartingTabIndex,
  };
}

class ChartingTabs extends Component {
  styles = {
    WIP: {
      width: '100%',
      height: '100%',

      fontSize: cssVariables.smallFontSize,

      justifyContent: 'space-between',
    },
  };

  getTabsString() {
    let string = '';

    this.props.tabs.forEach((chartingTab) => {
      string = string.concat(`${chartingTab.symbol}, `);
    });

    return string;
  }

  render() {
    return (
      <FlexView vAlignContent="center" style={this.styles.WIP}>
        <div>tabs: {this.getTabsString()}</div>
        <div>activeIndex: {this.props.activeIndex}</div>
      </FlexView>
    );
  }
}

export default connect(mapStateToProps, null)(ChartingTabs);
