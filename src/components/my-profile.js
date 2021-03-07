// this should be wrapped in a `PrivateRoute`: if not authenticated, redirect to sign-in

import React, { Component } from 'react';
import FlexView from 'react-flexview/lib';
import { connect } from 'react-redux';

import { fetchOwnProfile } from '../actions';
import cssVariables from '../style.scss';

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
const overviewSectionHeight = 80; // in px
const overviewSectionLeftWidth = 300; // in px

class MyProfile extends Component {
  styles = {
    profileComponent: {
      padding: '25px',
      width: '100%',
    },
    overviewSection: {
      height: `${overviewSectionHeight}px`,
      width: '100%',
      maxWidth: profileMaxWidth,

      marginBottom: '25px',
    },
    overviewSectionLeft: {
      width: `${overviewSectionLeftWidth}px`,
      height: '100%',
    },
    profilePictureContainer: {
      width: `${overviewSectionHeight}px`,
      height: `${overviewSectionHeight}px`,
    },
    profilePicture: {
      width: '100%',
      height: '100%',

      border: `3px solid ${cssVariables.tvPurple}`,
      borderRadius: '3px',

      backgroundColor: cssVariables.bgGrey,
    },
    usernameAndSubscription: {
      // the overviewSectionHeight is also the width of the profilePictureContainer
      width: `${overviewSectionLeftWidth - overviewSectionHeight}px`,
      height: `${overviewSectionHeight}px`,

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

      marginRight: '20px',
    },
    subscriptionButton: {
      padding: '1px 2px',

      fontSize: cssVariables.extraSmallFontSize,
    },
    overviewSectionRight: {
      width: `calc(100% - ${overviewSectionLeftWidth}px)`,
      height: '100%',

      fontSize: cssVariables.mediumFontSize,
    },
    overviewSectionRightSingleRow: {
      height: '50%',

      justifyContent: 'space-between',
    },
    detailsSection: {
      border: '3px solid black',

      height: '550px',
      width: '100%',
      maxWidth: profileMaxWidth,

      fontSize: cssVariables.smallFontSize,
    },
  };

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
      <FlexView column hAlignContent="center" style={this.styles.profileComponent}>
        <FlexView style={this.styles.overviewSection}>

          {/* left section */}
          <FlexView style={this.styles.overviewSectionLeft}>
            <FlexView hAlignContent="center" vAlignContent="center" style={this.styles.profilePictureContainer}>
              <div style={this.styles.profilePicture} />
            </FlexView>

            <FlexView column style={this.styles.usernameAndSubscription}>
              <FlexView vAlignContent="center" style={this.styles.username}>
                {this.props.profile.auth.username}
              </FlexView>
              <FlexView vAlignContent="center" style={this.styles.subscriptionContainer}>
                <div style={this.styles.subscriptionText}>
                  {this.renderSubscriptionText()}
                </div>
                <button type="button" className="secondary-btn" onClick={this.onClickSubscriptionButton} style={this.styles.subscriptionButton}>
                  {this.renderSubscriptionButtonText()}
                </button>
              </FlexView>
            </FlexView>
          </FlexView>

          {/* right section */}
          <FlexView column style={this.styles.overviewSectionRight}>
            <FlexView vAlignContent="center" style={this.styles.overviewSectionRightSingleRow}>
              <div>{this.renderJoinedTimeAgo()}</div>
              <div>Followers: {this.props.profile.social.followers.length}</div>
              <div>Following: {this.props.profile.social.following.length}</div>
            </FlexView>

            <FlexView vAlignContent="center" style={this.styles.overviewSectionRightSingleRow}>
              <div>Posts: {this.props.profile.social.ownPosts.length}</div>
              <div>{this.renderTotalIdeaCount()}</div>
              <div>{this.renderTotalLikeCount()}</div>
            </FlexView>
          </FlexView>
        </FlexView>
        <div style={this.styles.detailsSection}>
          {this.renderJoinedTimeAgo()}
        </div>
      </FlexView>
    );
  }
}

export default connect(mapStateToProps, mapFunctionToProps)(MyProfile);
