import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import FlexView from 'react-flexview';

import { routePaths } from '../../global-variables';
import cssVariables from '../../style.scss';

// import {  } from '../actions/user-actions';

// const tabs = {
//   social: [
//     following,
//     followers,
//     posts,
//     comments,
//     message system,
//   ],
//   quickTools: [
//     watchlists,
//     alerts,
//     notes,
//   ],
//   simulatedAccounts: [],
//   ideas: [
//     ...
//   ],
//   settings: {
//     subscription management,
//     ...
//   },
// }

function mapStateToProps(reduxState) {
  return {
    profile: reduxState.user.profile,
  };
}

class ProfileDetails extends Component {
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
        <NavLink to={routePaths.Landing}>WORK IN PROGRESS</NavLink>
      </FlexView>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(ProfileDetails));
