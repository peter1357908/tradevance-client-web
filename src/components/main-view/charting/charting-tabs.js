import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartingTab from './charting-tab';

function mapStateToProps(reduxState) {
  return {
    tabs: reduxState.mainView.chartingTabs,
    activeIndex: reduxState.mainView.activeChartingTabIndex,
  };
}

class ChartingTabs extends Component {
  styles = {
    chartingTabs: {
      display: 'flex',

      width: '100%',
      height: '100%',
    },
  };

  chartingTabGeneratorCallBack = (chartingTabObject, index) => {
    const isActive = (index === this.props.activeIndex);

    return (
      <ChartingTab
        key={index}
        isActive={isActive}
        index={index}
        symbol={chartingTabObject.symbol}
      />
    );
  };

  render() {
    return (
      <div style={this.styles.chartingTabs}>
        {this.props.tabs.map(this.chartingTabGeneratorCallBack)}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ChartingTabs);
