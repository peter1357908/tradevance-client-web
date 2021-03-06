import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { signUpUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  onInputChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onInputChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onClickBack = (event) => {
    this.props.history.goBack();
  }

  onClickSignUp = (event) => {
    const authData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signUpUser(authData, this.props.history);
  }

  render() {
    return (
      // TODO: fix these bad classNames... not exactly a
      // post(-options)-container, yeah? Gotta make them style-oriented
      // rather than id-oriented.
      <div id="auth-container" className="post-container">
        <Card id="auth-card" className="detailed-post-card">
          <Card.Body>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeUsername} value={this.state.username} placeholder="Username" /></Card.Text>
            <Card.Text><Form.Control type="password" onChange={this.onInputChangePassword} value={this.state.password} placeholder="Password" /></Card.Text>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeEmail} value={this.state.email} placeholder="Email (you may change this later)" /></Card.Text>
          </Card.Body>
        </Card>

        <div id="auth-options" className="post-options-container">
          <Button variant="light" onClick={this.onClickBack}>
            <i className="fas fa-arrow-alt-circle-left" />
          </Button>
          <Button variant="light" onClick={this.onClickSignUp}>
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signUpUser })(SignUp));
