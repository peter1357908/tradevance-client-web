import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import NavBar from './nav-bar';

const App = (props) => {
  return (
    <Router>
      <div id="app-container">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
};

export default App;
