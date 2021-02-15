import React from 'react';
import FlexView from 'react-flexview';
import { useHistory } from 'react-router-dom';
import routePaths from './routePaths';

import variables from '../style.scss';

const ratio = 0.618; // approximated golden ratio
const maxWidth = 1280; // the maximum the content can stretch to, in px
const sectionRelativeHeight = `${ratio * 100}vw`;
const sectionMaxWidth = `${maxWidth}px`;
const sectionMaxHeight = `${maxWidth * ratio}px`;

// Section 1
// "Discover and perfect your trading strategy"
const section1TextVWRatio = 3;

const Section1 = (props) => {
  const styles = {
    section: {
      width: '100%',
      height: sectionRelativeHeight,
      maxWidth: sectionMaxWidth,
      maxHeight: sectionMaxHeight,
    },
    leftPanel: {
      width: '50%',
      height: '100%',
      padding: '5%',
    },
    text: {
      position: 'relative',
      top: '30%',

      fontWeight: 'bold',
      fontSize: `min(${section1TextVWRatio}vw, ${maxWidth * section1TextVWRatio * 0.01}px)`,
      lineHeight: '1.5',
    },
    btn: {
      position: 'relative',
      top: '40%',

      width: '35%',
      height: '10%',
      lineHeight: '100%',
      fontSize: `min(${section1TextVWRatio * 0.8}vw, ${maxWidth * section1TextVWRatio * 0.8 * 0.01}px)`,
    },
    rightPanel: {
      width: '50%',
      height: '100%',
      backgroundColor: variables.bgGrey,
    },
  };

  function handleClick() {
    props.history.push(routePaths.Auth);
  }

  return (
    <FlexView style={styles.section}>
      <div style={styles.leftPanel}>
        <p style={styles.text}>Discover and perfect your trading strategy</p>
        <button type="button" className="primary-btn" style={styles.btn} onClick={handleClick}>Join Now</button>
      </div>
      <div style={styles.rightPanel}>
        {/* <img /> */}
      </div>
    </FlexView>
  );
};

// Section 2
// "A suite of comprehensive trading utility tools"
const section2TitleTextVWRatio = 3;
const section2CardTitleTextVWRatio = 2;
const section2CardTextVWRatio = 0.8 * section2CardTitleTextVWRatio;

const Section2Card = (props) => {
  const { styles } = props;
  function handleClick() {
    props.history.push(props.learnMoreRoute);
  }

  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{props.cardTitle}</p>
      <p style={styles.cardText}>{props.cardText}</p>
      <button type="button" className="secondary-btn" style={styles.btn} onClick={handleClick}>Learn More</button>
    </div>
  );
};

const Section2 = (props) => {
  const styles = {
    section: {
      width: '100%',
      height: sectionRelativeHeight,
      maxWidth: sectionMaxWidth,
      maxHeight: sectionMaxHeight,
    },
    sectionTitle: {
      width: '100%',
      height: '30%',
      top: '0px',
    },
    sectionTitleText: {
      fontWeight: 'bold',
      // the following makes sure that the font size scales
      // dynamically, up to a maximum specified by the maxWidth
      fontSize: `min(${section2TitleTextVWRatio}vw, ${maxWidth * section2TitleTextVWRatio * 0.01}px)`,
    },
    cards: {
      width: '100%',
      height: '70%',
      bottom: '0px',

      backgroundColor: variables.bgGrey,
    },
    card: {
      height: '50%',
      padding: '7%',
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: `min(${section2CardTitleTextVWRatio}vw, ${maxWidth * section2CardTitleTextVWRatio * 0.01}px)`,
      margin: '0',
    },
    cardText: {
      fontSize: `min(${section2CardTextVWRatio}vw, ${maxWidth * section2CardTextVWRatio * 0.01}px)`,
      lineHeight: '1',
      margin: '2% 0 5%',
    },
    btn: {
      width: '30%',
      height: '20%',
      lineHeight: '100%',
      fontSize: `min(${section2CardTextVWRatio}vw, ${maxWidth * section2CardTextVWRatio * 0.01}px)`,
    },
  };

  return (
    <div style={styles.section}>
      <FlexView style={styles.sectionTitle} vAlignContent="center" hAlignContent="center">
        <span style={styles.sectionTitleText}>A suite of comprehensive trading utility tools</span>
      </FlexView>
      <FlexView style={styles.cards}>
        <FlexView column>
          <Section2Card
            cardTitle="Technical Analysis Tools"
            cardText="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
            styles={styles}
            history={props.history}
            learnMoreRoute={routePaths.Landing}
          />
          <Section2Card
            cardTitle="Built-in and Build-Your-Own Trading Models"
            cardText="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
            styles={styles}
            history={props.history}
            learnMoreRoute={routePaths.Landing}
          />
        </FlexView>
        <FlexView column>
          <Section2Card
            cardTitle="Hisotrical and Real-Time Trading Simulation"
            cardText="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
            styles={styles}
            history={props.history}
            learnMoreRoute={routePaths.Landing}
          />
          <Section2Card
            cardTitle="Automatic Model Performance Evaluation"
            cardText="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
            styles={styles}
            history={props.history}
            learnMoreRoute={routePaths.Landing}
          />
        </FlexView>
      </FlexView>
    </div>
  );
};

// // Section 3
// // "Be productive on the go"
// const Section3 = () => {
// };

// // Footer
// const Footer = () => {
// };

// Landing Page (default export)
const Landing = (props) => {
  const history = useHistory();

  return (
    <FlexView column hAlignContent="center">
      <Section1 history={history} />
      <Section2 history={history} />
    </FlexView>
  );
};

export default Landing;
