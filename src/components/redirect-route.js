/* eslint-disable react/jsx-props-no-spreading */
// a wrapper around components:
// if authenticated; redirect to the given authenticatedRoute;
// if not authenticated; render the wrapped component as usual

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.user.authenticated,
  };
}

// rename the "component" passed to RedirectRoute as "Child"
// and seprate out the parameter authenticatedRoute; then,
// pack the rest to "props", which is later unpacked for
// Route, which is THEN repacked implicitly into routeProps...
// (assumes that the authenticatedRoute takes in no props)
const RedirectRoute = ({ authenticatedRoute, component: Child, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (props.authenticated ? (
        <Redirect to={authenticatedRoute} />
      ) : (
        <Child {...routeProps} />
      ))}
    />
  );
};

export default withRouter(connect(mapStateToProps, null)(RedirectRoute));
