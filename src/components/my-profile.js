// this should be wrapped in a `PrivateRoute`: if not authenticated, redirect to sign-in

import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(reduxState) {
  return {
    profile: reduxState.user.profile,
  };
}

class MyProfile extends Component {
  styles = {};

  render() {
    return (
      <div>
        {JSON.stringify(this.props.profile)}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MyProfile);
