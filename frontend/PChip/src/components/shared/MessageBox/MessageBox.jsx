import React from 'react';

import classes from './MessageBox.module.css';

const MessageBox = (props) => {
  return (
    <div
      className={`${classes.ErrorContainer} ${
        props.emailSent ? classes.emailSent : null
      }`}
    >
      <p className={classes.ErrorText}>{props.children}</p>
    </div>
  );
};

export default MessageBox;
