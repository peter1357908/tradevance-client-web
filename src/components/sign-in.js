// this should be wrapped in a `RedirectRoute`: if authenticated, redirect to my-profile

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { withRouter } from 'react-router';

import FlexView from 'react-flexview';

import { signInUser } from '../actions/user-actions';

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
    return (
      <FlexView column hAlignContent="center" style={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Body>
            <Card.Text><Form.Control type="text" onChange={this.onInputChangeUsername} value={this.state.username} placeholder="Username" /></Card.Text>
            <Card.Text><Form.Control type="password" onChange={this.onInputChangePassword} value={this.state.password} placeholder="Password" /></Card.Text>
          </Card.Body>
        </Card>

        <FlexView style={styles.bottomButtonsContainer}>
          <button type="button" className="secondary-btn" onClick={this.onClickBack}>Back</button>
          <button type="button" className="primary-btn" onClick={this.onClickSignIn}>Sign In</button>
        </FlexView>
      </FlexView>
    );
  }
}

export default withRouter(connect(null, { signInUser })(SignIn));
