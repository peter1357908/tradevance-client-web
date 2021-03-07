import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FlexView from 'react-flexview/lib';

import NavBar from './nav-bar';
import Routes from './routes';
import Footer from './footer';

const App = (props) => {
  return (
    <Router>
      <FlexView column hAlignContent="center">
        <NavBar />
        <Routes />
        <Footer />
      </FlexView>
    </Router>
  );
};

export default App;
