import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import FlexView from 'react-flexview';

import { routePaths } from '../global-variables';
import cssVariables from '../style.scss';

const Footer = (props) => {
  const styles = {
    footer: {
      padding: '0px 20px',
      width: '100%',
      height: `${cssVariables.navBarHeight}px`,

      backgroundColor: cssVariables.bgGrey,
      borderTop: cssVariables.defaultBorder,

      justifyContent: 'space-between',
    },

    minilogo: {
      height: `${cssVariables.navBarHeight * 0.5}px`,
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
            src="https://imgur.com/QxLhWZ0.png"
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
