// this should be wrapped in a `PrivateRoute`: if not authenticated, redirect to sign-in

import React, { Component } from 'react';
import FlexView from 'react-flexview/lib';
import { connect } from 'react-redux';

import { fetchOwnProfile } from '../actions';
import cssVariables from '../style.scss';

function mapStateToProps(reduxState) {
  return {
    profile: reduxState.user.profile,
  };
}

function mapFunctionToProps() {
  return {
    fetchOwnProfile,
  };
}

const profileMaxWidth = `${cssVariables.maxWidth}px`;

class MyProfile extends Component {
  styles = {
    profileComponent: {
      border: '3px solid green',
      padding: '25px',
      width: '100%',
    },
    overviewSection: {
      border: '3px solid black',

      height: '150px',
      width: '100%',
      maxWidth: profileMaxWidth,

      marginBottom: '25px',
      fontSize: cssVariables.mediumFontSize,
    },
    detailsSection: {
      border: '3px solid black',

      height: '550px',
      width: '100%',
      maxWidth: profileMaxWidth,

      fontSize: cssVariables.smallFontSize,
    },
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchOwnProfile(token);
  }

  render() {
    return (
      <FlexView column hAlignContent="center" style={this.styles.profileComponent}>
        <FlexView vAlignContent="center" style={this.styles.overviewSection}>
          This is the overviewSection
        </FlexView>
        <div style={this.styles.detailsSection}>
          {JSON.stringify(this.props.profile)}
        </div>
      </FlexView>
    );
  }
}

export default connect(mapStateToProps, mapFunctionToProps)(MyProfile);
