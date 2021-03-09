import React from 'react';

import cssVariables from '../../../style.scss';

// import {  } from '../actions/user-actions';

// function mapStateToProps(reduxState) {
//   return {
//     profile: reduxState.user.profile,
//   };
// }

const ToolPillar = (props) => {
  const styles = {
    WIP: {
      width: '100%',
      height: '100%',

      fontSize: cssVariables.mediumFontSize,
    },
  };

  return (
    <div className="center-the-only-item-inside" style={styles.WIP}>
      WIP
    </div>
  );
};

export default ToolPillar;
// export default withRouter(connect(mapStateToProps, null)(ToolPillar));
