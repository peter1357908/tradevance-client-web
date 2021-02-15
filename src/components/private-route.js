/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
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
        <Redirect to="/auth" />
      ))}
    />
  );
};

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
