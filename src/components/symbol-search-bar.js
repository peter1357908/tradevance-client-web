import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routePaths } from '../global-variables';

import { addChartingTabsBySymbols } from '../actions/main-view-actions';

const functionToPropsMapping = {
  addChartingTabsBySymbols,
};

class SymbolSearchBar extends Component {
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
    // we'll redirect with history.push() and this results in a canceled
    // submission warning if we don't do event.preventDefault()
    event.preventDefault();
    this.props.addChartingTabsBySymbols([this.state.searchString]);

    // only push if not in the mainview already
    if (this.props.location.pathname !== routePaths.MainView) {
      this.props.history.push(routePaths.MainView);
    }
  }

  render() {
    return (
      <form className="search-bar" style={this.props.searchBarStyle} onSubmit={this.handleSubmit}>
        <input type="text" style={this.props.searchBarInputStyle} onChange={this.onInputChangeSearchString} value={this.state.username} placeholder="Input symbol to search" />
        <button type="submit" style={this.props.searchBarButtonStyle} onClick={this.handleSubmit}>
          Go
        </button>
      </form>
    );
  }
}

export default withRouter(connect(null, functionToPropsMapping)(SymbolSearchBar));
