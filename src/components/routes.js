import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from '../route-paths';

import Landing from './landing';
// import MyProfile from './my-profile';
// import PublicProfile from './public-profile';
// import MainView from './main-view';
import SignIn from './sign-in';
import SignUp from './sign-up';
// import PrivateRoute from './private-route';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path={routePaths.Landing} component={Landing} />
      {/*
      <Route path=`${routePaths.MyProfile}/:username` component={MyProfile} />
      <Route path=`${routePaths.PublicProfile}/:username` component={PublicProfile} />
      <Route exact path={routePaths.MainView} component={MainView} /> */}
      <Route exact path={routePaths.SignIn} component={SignIn} />
      <Route exact path={routePaths.SignUp} component={SignUp} />
      <Route render={() => (<p>Error 404: This page does not exist yet!</p>)} />
    </Switch>
  );
};

export default Routes;
