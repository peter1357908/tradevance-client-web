// this should be wrapped in a `PrivateRoute`: if not authenticated, redirect to sign-in

import React, { Component } from 'react';
import FlexView from 'react-flexview/lib';
import { connect } from 'react-redux';

import { fetchOwnProfile } from '../actions';
import cssVariables from '../style.scss';

import ProfileDetails from './profile-details';

function mapStateToProps(reduxState) {
  return {
    profile: reduxState.user.profile,
  };
}

function mapFunctionToProps() {
  return {
    fetchOwnProfile,
  };
}

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

    border: `3px solid ${cssVariables.tvPurple}`,
    borderRadius: '3px',

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
    border: `3px solid ${cssVariables.tvPurple}`,

    height: `${profileDetailsHeight}px`,
    width: '100%',
    maxWidth: profileMaxWidth,
  },
};

class MyProfile extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchOwnProfile(token);
  }

  onClickSubscriptionButton = (event) => {
    console.log('subscription button clicked');
  }

  renderSubscriptionText() {
    console.log(this.props.profile.subscription.plan);
    const subscriptionPlanString = this.props.profile.subscription.plan;
    if (subscriptionPlanString === '') {
      return ('Free Plan');
    } else {
      return subscriptionPlanString;
    }
  }

  renderSubscriptionButtonText() {
    if (this.props.profile.subscription.plan === '') {
      return ('Subscribe');
    } else {
      return ('Manage');
    }
  }

  // TODO: consider leap years/use more elegant solution
  renderJoinedTimeAgo() {
    const createdAtString = this.props.profile.createdAt;
    // if the data is not available yet, render nothing
    if (createdAtString === '') {
      return ('');
    }

    const currentDate = new Date();
    const createdAtDate = new Date(createdAtString);
    const difference = currentDate - createdAtDate;

    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const yearInMilliseconds = dayInMilliseconds * 365;
    const yearDifference = Math.floor(difference / yearInMilliseconds);
    const yearRemainder = difference % yearInMilliseconds;
    const dayDifference = Math.floor(yearRemainder / dayInMilliseconds);

    if (yearDifference < 1 && dayDifference < 1) {
      return ('Joined less than a day ago');
    }

    let outputString = '';

    if (yearDifference > 0) {
      outputString = `Joined ${yearDifference} year${yearDifference > 1 ? 's' : ''} and`;
    } else {
      outputString = 'Joined';
    }

    return (`${outputString} ${dayDifference} day${dayDifference > 1 ? 's' : ''} ago`);
  }

  renderTotalIdeaCount() {
    let totalIdeaCount = 0;
    Object.values(this.props.profile.ideas.own)
      .forEach((ideaArray) => {
        totalIdeaCount += ideaArray.length;
      });
    return (`Ideas: ${totalIdeaCount}`);
  }

  renderTotalLikeCount() {
    const totalLikeCount = Object.values(this.props.profile.social.likeCount)
      .reduce((sum, next) => sum + next, 0);
    return (`Likes: ${totalLikeCount}`);
  }

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
                {this.props.profile.auth.username}
              </FlexView>
              <FlexView vAlignContent="center" style={styles.subscriptionContainer}>
                <div style={styles.subscriptionText}>
                  {this.renderSubscriptionText()}
                </div>
                <button type="button" className="secondary-btn" onClick={this.onClickSubscriptionButton} style={styles.subscriptionButton}>
                  {this.renderSubscriptionButtonText()}
                </button>
              </FlexView>
            </FlexView>
          </FlexView>

          {/* right section */}
          <FlexView column style={styles.overviewRight}>
            <FlexView vAlignContent="center" style={styles.overviewRightSingleRow}>
              <div>{this.renderJoinedTimeAgo()}</div>
              <div>Followers: {this.props.profile.social.followers.length}</div>
              <div>Following: {this.props.profile.social.following.length}</div>
            </FlexView>

            <FlexView vAlignContent="center" style={styles.overviewRightSingleRow}>
              <div>Posts: {this.props.profile.social.ownPosts.length}</div>
              <div>{this.renderTotalIdeaCount()}</div>
              <div>{this.renderTotalLikeCount()}</div>
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

export default connect(mapStateToProps, mapFunctionToProps)(MyProfile);
