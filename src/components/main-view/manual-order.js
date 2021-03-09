import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { routePaths } from '../../global-variables';
import cssVariables from '../../style.scss';

// import {  } from '../actions/user-actions';

function mapStateToProps(reduxState) {
  return {
    profile: reduxState.user.profile,
  };
}

class ManualOrderView extends Component {
  styles = {
    WIP: {
      width: '100%',
      height: '100%',

      fontSize: cssVariables.mediumFontSize,
    },
  };

  render() {
    return (
      <div className="center-the-only-item-inside" style={this.styles.WIP}>
        <NavLink to={routePaths.Landing}>WORK IN PROGRESS</NavLink>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(ManualOrderView));
