import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setActiveChartingTabIndex, removeChartingTabsByIndices } from '../../../actions/main-view-actions';

const functionToPropMappings = {
  setActiveChartingTabIndex,
  removeChartingTabsByIndices,
};

// expects the following props:
// isActive: Boolean
// isLast: Boolean
// index: Number
// symbol: String
class ChartingTab extends Component {
  handleClick = (event) => {
    if (!this.props.isActive) {
      this.props.setActiveChartingTabIndex(this.props.index);
    }
  }

  handleClose = (event) => {
    this.props.removeChartingTabsByIndices([this.props.index]);
  }

  render() {
    let containerClassName = 'charting-tab-container';
    let tabClassName = 'charting-tab';
    let closeButtonClassName = 'charting-tab-close';
    if (this.props.isActive) {
      containerClassName = containerClassName.concat(' charting-tab-container-active');
      tabClassName = tabClassName.concat(' charting-tab-active');
      closeButtonClassName = closeButtonClassName.concat(' charting-tab-close-active');
    }

    return (
      <div className={containerClassName}>
        <button type="button" onClick={this.handleClick} className={tabClassName}>
          {this.props.symbol}
        </button>
        <button type="button" className={closeButtonClassName} onClick={this.handleClose}>
          &#10006;
        </button>
      </div>
    );
  }
}

export default connect(null, functionToPropMappings)(ChartingTab);
