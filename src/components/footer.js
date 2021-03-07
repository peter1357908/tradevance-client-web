import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import FlexView from 'react-flexview';

import routePaths from '../route-paths';
import cssVariables from '../style.scss';

const Footer = (props) => {
  const footerHeight = 80;

  const styles = {
    footer: {
      padding: '0px 20px',
      width: '100%',
      height: `${footerHeight}px`,

      backgroundColor: cssVariables.bgGrey,
      borderTop: `3px solid ${cssVariables.tvPurple}`,

      justifyContent: 'space-between',
    },

    minilogo: {
      height: `${footerHeight * 0.5}px`,
    },

    links: {
      width: '450px',

      justifyContent: 'space-between',
    },

    link: {
      fontWeight: 'bold',
    },

    copyrightStatement: {
      fontSize: '8px',
    },

    copyrightStatementLink: {
      textDecoration: 'none',
    },
  };

  function footerNavLink(targetRoutePath, linkText) {
    return (
      <NavLink to={targetRoutePath} className="footer-link" style={styles.link}>{linkText}</NavLink>
    );
  }

  // hide the footer when in the MainView
  if (props.location.pathname === routePaths.MainView) {
    return (null);
  } else {
    return (
      <FlexView vAlignContent="center" style={styles.footer}>
        <NavLink to={routePaths.Landing}>
          <img
            src="https://drive.google.com/uc?id=1bX4qclO7qivWCMWHaeltUsP1Jm9ZvG8a"
            style={styles.minilogo}
            alt="TradeVance Mini-Logo"
          />
        </NavLink>
        <FlexView vAlignContent="center" style={styles.links}>
          {footerNavLink(routePaths.Landing, 'About Us')}
          {footerNavLink(routePaths.Landing, 'Help')}
          {footerNavLink(routePaths.Landing, 'Suggestions')}
          {footerNavLink(routePaths.Landing, 'Business Contact')}
        </FlexView>
        <FlexView vAlignContent="center" style={styles.copyrightStatement}>
          &copy; 2021 by&nbsp;
          <a href="https://www.linkedin.com/in/shengsong-gao/" style={styles.copyrightStatementLink}>Shengsong Gao</a>
        </FlexView>
      </FlexView>
    );
  }
};

export default withRouter(Footer);
