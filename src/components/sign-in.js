// this should be wrapped in a `RedirectRoute`: if authenticated, redirect to my-profile

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { signInUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onInputChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onClickBack = (event) => {
    this.props.history.goBack();
  }

  onClickSignIn = (event) => {
    const authData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signInUser(authData, this.props.history);
  }

  render() {
    const styles = {
      formCard: {
        margin: 'auto 50px',
      },

      bottomButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
      },

      button: {
        margin: '30px',
      },
    };

    return (
      <div>
        <Card style={styles.formCard}>
          <Card.Body>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeUsername} value={this.state.username} placeholder="Username" /></Card.Text>
            <Card.Text><Form.Control type="password" onChange={this.onInputChangePassword} value={this.state.password} placeholder="Password" /></Card.Text>
          </Card.Body>
        </Card>

        <div style={styles.bottomButtonsContainer}>
          <button type="button" className="secondary-btn" style={styles.button} onClick={this.onClickBack}>Back</button>
          <button type="button" className="primary-btn" style={styles.button} onClick={this.onClickSignIn}>Sign In</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signInUser })(SignIn));
