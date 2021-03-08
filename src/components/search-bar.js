import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routePaths } from '../global-variables';
import cssVariables from '../style.scss';

import { setSearchString } from '../actions/main-view-actions';

const functionToPropsMapping = {
  setSearchString,
};

const styles = {
  searchBar: {
    height: '50%',
    width: `min(40vw, ${cssVariables.maxWidth * 0.5}px)`,
  },
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };
  }

  onInputChangeSearchString = (event) => {
    this.setState({ searchString: event.target.value });
  }

  handleSubmit = (event) => {
    console.log(this.state.searchString);
    // we'll redirect with history.push() and this results in a canceled
    // submission warning if we don't do event.preventDefault()
    event.preventDefault();
    this.props.setSearchString(this.state.searchString);
    console.log(`after this.props.setSearchString ${this.props.setSearchString}`);

    this.props.history.push(routePaths.MainView);
  }

  render() {
    return (
      <form className="search-bar" style={styles.searchBar} onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.onInputChangeSearchString} value={this.state.username} placeholder="Input symbol to search" />
        <button type="submit" onClick={this.handleSubmit}>
          Go
        </button>
      </form>
    );
  }
}

export default withRouter(connect(null, functionToPropsMapping)(SearchBar));
