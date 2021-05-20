import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routePaths } from '../global-variables';

import Landing from './landing';
import Profile from './profile';
// import OtherProfile from './other-profile';
import MainView from './main-view';
import SignIn from './sign-in';
import SignUp from './sign-up';

// wrapper routes
import PrivateRoute from './private-route';
import RedirectRoute from './redirect-route';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path={routePaths.Landing} component={Landing} />
      <PrivateRoute path={routePaths.Profile} component={Profile} />
      {/*
      <Route path=`${routePaths.OtherProfile}/:username` component={OtherProfile} />
      */}
      <Route exact path={routePaths.MainView} component={MainView} />
      <RedirectRoute
        exact
        path={routePaths.SignIn}
        component={SignIn}
        authenticatedRoute={routePaths.Profile}
      />
      <RedirectRoute
        exact
        path={routePaths.SignUp}
        component={SignUp}
        authenticatedRoute={routePaths.Profile}
      />
      <Route render={() => (<p>Error 404: This page does not exist yet!</p>)} />
    </Switch>
  );
};

export default Routes;
