/* since sign-in and sign-up currently require the exact same data,
 * this authentication Component uses one form and two buttons to take
 * care of both authentication actions.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { signinUser, signupUser } from '../actions';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  onInputChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onBack = (event) => {
    this.props.history.push('/');
  }

  onClickSignin = (event) => {
    const authData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signinUser(authData, this.props.history);
  }

  onClickSignup = (event) => {
    const authData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signupUser(authData, this.props.history);
  }

  render() {
    return (
      // TODO: fix these bad classNames... not exactly a
      // post(-options)-container, yeah? Gotta make them style-oriented
      // rather than id-oriented.
      <div id="auth-container" className="post-container">
        <div id="auth-options" className="post-options-container">
          <Button variant="light" onClick={this.onBack}>
            <i className="fas fa-arrow-alt-circle-left" />
          </Button>
          <Button variant="light" onClick={this.onClickSignin}>
            Sign in
          </Button>
          <Button variant="light" onClick={this.onClickSignup}>
            Sign up
          </Button>
        </div>
        <Card id="auth-card" className="detailed-post-card">
          <Card.Body>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeUsername} value={this.state.username} placeholder="Username" /></Card.Text>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeEmail} value={this.state.email} placeholder="Email (only needed when signing up for a new account)" /></Card.Text>
            <Card.Text><Form.Control type="password" onChange={this.onInputChangePassword} value={this.state.password} placeholder="Password" /></Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser, signupUser })(Auth));
