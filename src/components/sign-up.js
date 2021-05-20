// this should be wrapped in a `RedirectRoute`: if authenticated, redirect to `Profile`

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { withRouter } from 'react-router';

import FlexView from 'react-flexview';

import { signUpUser } from '../actions/auth-actions';

import cssVariables from '../style.scss';

const styles = {
  formContainer: {
    height: `calc(100vh - 2 * ${cssVariables.navBarHeight}px)`,
    width: '100%',
    maxWidth: `${cssVariables.maxWidth}px`,

    padding: '20px 50px',
  },

  formCard: {
    width: '50%',

    marginBottom: '20px',
  },

  bottomButtonsContainer: {
    width: '30%',

    justifyContent: 'space-between',
  },
};

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
      <FlexView column hAlignContent="center" style={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Body>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeUsername} value={this.state.username} placeholder="Username" /></Card.Text>
            <Card.Text><Form.Control type="password" onChange={this.onInputChangePassword} value={this.state.password} placeholder="Password" /></Card.Text>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeEmail} value={this.state.email} placeholder="Email (you may change this later)" /></Card.Text>
          </Card.Body>
        </Card>

        <FlexView style={styles.bottomButtonsContainer}>
          <button type="button" className="secondary-btn" style={styles.button} onClick={this.onClickBack}>Back</button>
          <button type="button" className="primary-btn" style={styles.button} onClick={this.onClickSignUp}>Sign Up</button>
        </FlexView>
      </FlexView>
    );
  }
}

export default withRouter(connect(null, { signUpUser })(SignUp));
