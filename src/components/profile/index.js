// this should be wrapped in a `PrivateRoute`: if not authenticated, redirect to sign-in

import React, { Component } from 'react';
import FlexView from 'react-flexview/lib';
import { connect } from 'react-redux';

import { fetchOverview } from '../../actions/profile-actions/overview-actions';
import cssVariables from '../../style.scss';

import ProfileDetails from './profile-details';

function mapStateToProps(reduxState) {
  return {
    overview: reduxState.overview,
  };
}

const functionToPropMappings = {
  fetchOverview,
};

const profileMaxWidth = `${cssVariables.maxWidth}px`;
const overviewHeight = 80; // in px
const profileDetailsHeight = 550; // in px
const spaceBetween = 25; // in px, realized by margin/padding
const overviewLeftWidth = 300; // in px

const styles = {
  profileComponent: {
    height: `max(calc(100vh - ${cssVariables.navBarHeight * 2}px), ${overviewHeight + profileDetailsHeight + spaceBetween * 3}px)`,
    padding: `${spaceBetween}px`,
    width: '100%',
  },
  overview: {
    height: `${overviewHeight}px`,
    width: '100%',
    maxWidth: profileMaxWidth,

    marginBottom: `${spaceBetween}px`,
  },
  overviewLeft: {
    width: `${overviewLeftWidth}px`,
    height: '100%',
  },
  profilePictureContainer: {
    width: `${overviewHeight}px`,
    height: `${overviewHeight}px`,
  },
  profilePicture: {
    width: '100%',
    height: '100%',

    border: cssVariables.defaultBorder,
    borderRadius: cssVariables.defaultBorderRadius,

    backgroundColor: cssVariables.bgGrey,
  },
  usernameAndSubscription: {
    // the overviewHeight is also the width of the profilePictureContainer
    width: `${overviewLeftWidth - overviewHeight}px`,
    height: `${overviewHeight}px`,

    padding: '0 5%',
  },
  username: {
    height: '60%',

    color: cssVariables.tvPurple,
    fontWeight: 'bold',
    fontSize: cssVariables.largeFontSize,
  },
  subscriptionContainer: {
    height: '40%',
  },
  subscriptionText: {
    fontSize: cssVariables.extraSmallFontSize,

    marginRight: `${spaceBetween}px`,
  },
  subscriptionButton: {
    padding: '1px 2px',
    border: `2px solid ${cssVariables.tvPurple}`,

    fontSize: cssVariables.extraSmallFontSize,
  },
  overviewRight: {
    width: `calc(100% - ${overviewLeftWidth}px)`,
    height: '100%',

    fontSize: cssVariables.mediumFontSize,
  },
  overviewRightSingleRow: {
    height: '50%',

    justifyContent: 'space-between',
  },
  profileDetailsContainer: {
    border: cssVariables.defaultBorder,
    borderRadius: cssVariables.defaultBorderRadius,

    height: `${profileDetailsHeight}px`,
    width: '100%',
    maxWidth: profileMaxWidth,
  },
};

class Profile extends Component {
  componentDidMount() {
    this.props.fetchOverview();
  }

  // TODO: implement and uncomment
  // onClickSubscriptionButton = (event) => {
  //   console.log('subscription button clicked');
  // }

  // TODO: implement and uncomment
  // renderSubscriptionButtonText() {
  //   // the name should be consistent with the server side definition
  //   if (this.props.overview.subscriptionName === 'FREE PLAN') {
  //     return ('Upgrade');
  //   } else {
  //     return ('Manage');
  //   }
  // }

  render() {
    return (
      <FlexView column hAlignContent="center" style={styles.profileComponent}>
        <FlexView style={styles.overview}>

          {/* left section */}
          <FlexView style={styles.overviewLeft}>
            <FlexView hAlignContent="center" vAlignContent="center" style={styles.profilePictureContainer}>
              <div style={styles.profilePicture} />
            </FlexView>

            <FlexView column style={styles.usernameAndSubscription}>
              <FlexView vAlignContent="center" style={styles.username}>
                {this.props.overview.username}
              </FlexView>
              <FlexView vAlignContent="center" style={styles.subscriptionContainer}>
                <div style={styles.subscriptionText}>
                  {this.props.overview.subscriptionName}
                </div>
                {/* TODO: implement and uncomment */}
                {/* <button type="button" className="secondary-btn" onClick={this.onClickSubscriptionButton} style={styles.subscriptionButton}>
                  {this.renderSubscriptionButtonText()}
                </button> */}
              </FlexView>
            </FlexView>
          </FlexView>

          {/* right section */}
          <FlexView column style={styles.overviewRight}>
            <FlexView vAlignContent="center" style={styles.overviewRightSingleRow}>
              <div>{this.props.overview.joinedTimeAgo}</div>
            </FlexView>

            <FlexView vAlignContent="center" style={styles.overviewRightSingleRow}>
              <div>Followers: {this.props.overview.numFollowers}</div>
              <div>Following: {this.props.overview.numFollowing}</div>
              <div>Likes: {this.props.overview.numLikes}</div>
            </FlexView>
          </FlexView>
        </FlexView>
        <div style={styles.profileDetailsContainer}>
          <ProfileDetails />
        </div>
      </FlexView>
    );
  }
}

export default connect(mapStateToProps, functionToPropMappings)(Profile);
