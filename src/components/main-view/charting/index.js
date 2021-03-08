import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import FlexView from 'react-flexview';

import { routePaths } from '../../../global-variables';
import cssVariables from '../../../style.scss';

// import {  } from '../actions/user-actions';

function mapStateToProps(reduxState) {
  return {
    searchString: reduxState.mainView.searchString,
  };
}

class SymbolChart extends Component {
  styles = {
    profileDetails: {
      width: '100%',
      height: '100%',

      fontSize: cssVariables.smallFontSize,
    },
  };

  render() {
    return (
      <FlexView vAlignContent="center" hAlignContent="center">
        <NavLink to={routePaths.Landing}>{this.props.searchString}</NavLink>
      </FlexView>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(SymbolChart));
