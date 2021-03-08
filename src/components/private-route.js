/* eslint-disable react/jsx-props-no-spreading */
// a wrapper around components:
// if authenticated; render the wrapped component as usual;
// if not authenticated; redirect to the sign-in page

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { routePaths } from '../global-variables';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.user.authenticated,
  };
}

// rename the "component" passed to PrivateRoute as "Child",
// then the rest to "props", which is later unpacked for
// Route, which is THEN repacked implicitly into routeProps...
const PrivateRoute = ({ component: Child, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (props.authenticated ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to={routePaths.SignIn} />
      ))}
    />
  );
};

export default connect(mapStateToProps, null)(PrivateRoute);
