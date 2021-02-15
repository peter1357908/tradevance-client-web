import React, { Component } from 'react';
import {
  Button, Navbar, Nav,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import routePaths from './routePaths';

import { signoutUser } from '../actions';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    currUser: reduxState.auth.username,
  };
}

class NavBar extends Component {
  onClickSignout = (event) => {
    this.props.signoutUser(this.props.history);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <NavLink to={routePaths.Landing}>
            <img
              src="https://drive.google.com/uc?id=1xIPCRtAdxfgtjPcDTz-oip4Z_O8vvlCl"
              style={{ maxHeight: '50px' }}
              alt="TradeVance Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* hackily use "nav-link" to simulate <Nav.Link> */}
            <NavLink className="nav-link" exact to={routePaths.Landing}>All Posts</NavLink>
            <NavLink className="nav-link" exact to="/posts/new">Create New Post</NavLink>
            {this.props.authenticated && <Nav.Link>{this.props.currUser}</Nav.Link>}
            {this.props.authenticated
              ? (
                <Button variant="outline-secondary" onClick={this.onClickSignout}>Sign out</Button>
              )
              : (
                <NavLink className="nav-link" exact to={routePaths.Auth}>Sign in/Sign up</NavLink>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
