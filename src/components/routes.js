import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './routePaths';

import Landing from './landing';
// import UserProfile from './user-profile';
// import MainView from './main-view';
import Auth from './auth';
// import PrivateRoute from './private-route';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path={routePaths.Landing} component={Landing} />
      {/* <Route path=`${routePaths.UserProfile}/:username` component={UserProfile} />
      <Route exact path={routePaths.MainView} component={MainView} /> */}
      <Route exact path={routePaths.Auth} component={Auth} />
      <Route render={() => (<p>Error 404: This page does not exist yet!</p>)} />
    </Switch>
  );
};

export default Routes;
