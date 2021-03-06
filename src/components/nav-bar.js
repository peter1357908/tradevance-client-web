import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

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

      width: '100%',
      height: `${this.navbarHeight}px`,

      backgroundColor: cssVariables.bgWhite,
    },

    logo: {
      // the following 4 lines vertically align an image
      position: 'absolute',
      top: '0',
      bottom: '0',
      margin: 'auto',

      left: '40px',
      height: `${this.navbarHeight * 0.5}px`,
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
    const styles = {
      secondaryBtn: {
        right: '180px',
      },
      primaryBtn: {
        right: '40px',
      },
    };

    if (this.props.authenticated) {
      return (
        <>
          <button type="button" className="secondary-btn vertically-centered" style={styles.secondaryBtn} onClick={this.onClickSignOut}>Sign Out</button>
          <button type="button" className="primary-btn vertically-centered" style={styles.primaryBtn} onClick={this.onClickUsername}>{this.props.profile.auth.username}</button>
        </>
      );
    } else {
      return (
        <>
          <button type="button" className="secondary-btn vertically-centered" style={styles.secondaryBtn} onClick={this.onClickSignIn}>Sign In</button>
          <button type="button" className="primary-btn vertically-centered" style={styles.primaryBtn} onClick={this.onClickSignUp}>Sign Up</button>
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
        <div style={this.styles.navBar}>
          <NavLink to={routePaths.Landing}>
            <img
              src="https://drive.google.com/uc?id=1xIPCRtAdxfgtjPcDTz-oip4Z_O8vvlCl"
              style={this.styles.logo}
              alt="TradeVance Logo"
            />
          </NavLink>
          {this.contextualButtons()}
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, { signOutUser })(NavBar));
