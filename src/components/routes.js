import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from '../route-paths';

import Landing from './landing';
import MyProfile from './my-profile';
// import PublicProfile from './public-profile';
// import MainView from './main-view';
import SignIn from './sign-in';
import SignUp from './sign-up';

// wrapper routes
import PrivateRoute from './private-route';
import RedirectRoute from './redirect-route';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path={routePaths.Landing} component={Landing} />
      <PrivateRoute path={routePaths.MyProfile} component={MyProfile} />
      {/*
      <Route path=`${routePaths.PublicProfile}/:username` component={PublicProfile} />
      <Route exact path={routePaths.MainView} component={MainView} />
      */}
      <RedirectRoute
        exact
        path={routePaths.SignIn}
        component={SignIn}
        authenticatedRoute={routePaths.MyProfile}
      />
      <RedirectRoute
        exact
        path={routePaths.SignUp}
        component={SignUp}
        authenticatedRoute={routePaths.MyProfile}
      />
      <Route render={() => (<p>Error 404: This page does not exist yet!</p>)} />
    </Switch>
  );
};

export default Routes;
