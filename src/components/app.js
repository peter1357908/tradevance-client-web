import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './nav-bar';
import Routes from './routes';
import Footer from './footer';

const App = (props) => {
  return (
    <Router>
      <div id="app-container">
        <NavBar />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
