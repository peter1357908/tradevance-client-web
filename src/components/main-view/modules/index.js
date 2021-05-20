import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routePaths } from '../../../global-variables';
import cssVariables from '../../../style.scss';

import {
  fetchWatchlists,
  addWatchlist,
  updateWatchlist,
} from '../../../actions/profile-actions/watchlist-actions';

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    watchlists: reduxState.watchlist.watchlists,
    tabs: reduxState.mainView.chartingTabs,
    activeIndex: reduxState.mainView.activeChartingTabIndex,
  };
}

const functionToPropMappings = {
  fetchWatchlists,
  addWatchlist,
  updateWatchlist,
};

class Module extends Component {
  styles = {
    watchlistsModuleContainer: {
      display: 'flex',
      flexDirection: 'column',

      padding: '5%',

      width: '100%',
      height: '100%',

      fontSize: cssVariables.smallFontSize,
    },
    actionsContainer: {
      display: 'flex',

      height: '80px',
      marginBottom: '20px',

      justifyContent: 'space-around',
      alignItems: 'center',
    },
    watchlistNameBar: {
      height: '40px',
      width: '250px',
    },
    watchListContainer: {
      height: '80px',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      watchlistName: '',
    };
  }

  componentDidMount() {
    console.log(`before fetch in didmount: ${this.props.authenticated}`); // DEBUG
    this.props.fetchWatchlists();
    console.log(`after fetch in didmount: ${this.props.authenticated}`); // DEBUG
  }

  onInputChangeWatchlistName = (event) => {
    this.setState({ watchlistName: event.target.value });
  }

  handleAddWatchlist = (event) => {
    event.preventDefault();
    console.log(`in handleAddWatchlist: ${this.props.authenticated}`); // DEBUG
    if (!this.props.authenticated) {
      this.props.history.push(routePaths.SignIn);
    }
    this.props.addWatchlist(this.state.watchlistName);
  }

  handleAddActiveSymbolToFirstWatchlist = (event) => {
    if (!this.props.authenticated) {
      this.props.history.push(routePaths.SignIn);
    }
    console.log(`in handleAddSymbolsToWatchlist: watchlist length: ${this.props.watchlists.length}; tabs: ${this.props.tabs}; active index: ${this.props.activeIndex}`); // DEBUG
    if (this.props.watchlists.length > 0 && this.props.activeIndex > -1) {
      const activeSymbol = this.props.tabs[this.props.activeIndex].symbol;
      const targetWatchlist = this.props.watchlists[0];
      targetWatchlist.symbols.push(activeSymbol);
      this.props.updateWatchlist(targetWatchlist._id, null, targetWatchlist.symbols);
    }
  }

  render() {
    return (
      <div style={this.styles.watchlistsModuleContainer}>
        <div style={this.styles.actionsContainer}>
          <form className="search-bar" style={this.styles.watchlistNameBar} onSubmit={this.handleAddWatchlist}>
            <input type="text" onChange={this.onInputChangeWatchlistName} value={this.state.watchlistName} placeholder="New watchlist name" />
            <button type="submit" onClick={this.handleAddWatchlist}>
              Go
            </button>
          </form>
          <button type="button" className="secondary-btn" onClick={this.handleAddActiveSymbolToFirstWatchlist}>
            Add current symbol to watchlist
          </button>
        </div>
        <div style={this.styles.watchListContainer}>
          {JSON.stringify(this.props.watchlists)}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, functionToPropMappings)(Module));
