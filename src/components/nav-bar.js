import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import FlexView from 'react-flexview';

import routePaths from '../route-paths';
import cssVariables from '../style.scss';

import { signOutUser } from '../actions';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.user.authenticated,
    profile: reduxState.user.profile,
  };
}

class NavBar extends Component {
  navbarHeight = 80;

  styles = {
    navBar: {
      // the following 3 lines make the nav-bar stick to the front and top
      position: 'sticky',
      top: '0px',
      zIndex: '9999',

      padding: '0px 20px',
      width: '100%',
      height: `${this.navbarHeight}px`,

      backgroundColor: cssVariables.bgWhite,
      borderBottom: `3px solid ${cssVariables.tvPurple}`,

      justifyContent: 'space-between',
    },

    logo: {
      height: `${this.navbarHeight * 0.5}px`,
    },

    buttons: {
      width: '220px',

      justifyContent: 'space-between',
    },
  };

  onClickSignUp = (event) => {
    this.props.history.push(routePaths.SignUp);
  }

  onClickSignIn = (event) => {
    this.props.history.push(routePaths.SignIn);
  }

  onClickUsername = (event) => {
    this.props.history.push(routePaths.MyProfile);
  }

  onClickSignOut = (event) => {
    this.props.signOutUser(this.props.history, routePaths.Landing);
  }

  contextualButtons = () => {
    if (this.props.authenticated) {
      return (
        <>
          <button type="button" className="secondary-btn" onClick={this.onClickSignOut}>Sign Out</button>
          <button type="button" className="primary-btn" onClick={this.onClickUsername}>{this.props.profile.auth.username}</button>
        </>
      );
    } else {
      return (
        <>
          <button type="button" className="secondary-btn" onClick={this.onClickSignIn}>Sign In</button>
          <button type="button" className="primary-btn" onClick={this.onClickSignUp}>Sign Up</button>
        </>
      );
    }
  }

  render() {
    // hide the nav-bar when in the MainView
    if (this.props.location.pathname === routePaths.MainView) {
      return (null);
    } else {
      return (
        <FlexView vAlignContent="center" style={this.styles.navBar}>
          <NavLink to={routePaths.Landing}>
            <img
              src="https://drive.google.com/uc?id=1xIPCRtAdxfgtjPcDTz-oip4Z_O8vvlCl"
              style={this.styles.logo}
              alt="TradeVance Logo"
            />
          </NavLink>
          <FlexView vAlignContent="center" style={this.styles.buttons}>
            {this.contextualButtons()}
          </FlexView>
        </FlexView>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, { signOutUser })(NavBar));
