import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputType = null;

  if (props.type === 'input') {
    inputType = (
      <input
        className={`${classes.Input}`}
        value={props.value}
        onChange={props.onInputChange}
      />
    );
  } else if (props.type === 'textarea') {
    inputType = (
      <textarea
        rows='6'
        className={classes.TextArea}
        onChange={props.onInputChange}
        value={props.value}
      />
    );
  } else if (props.type === 'password') {
    inputType = (
      <input
        type='password'
        className={`${classes.Input}`}
        value={props.value}
        onChange={props.onInputChange}
      />
    );
  } else if (props.type === 'email') {
    inputType = (
      <input
        type='email'
        className={`${classes.Input}`}
        value={props.value}
        onChange={props.onInputChange}
      />
    );
  }

  return (
    <div className={classes.InputCard}>
      <label className={`${classes.Label}`}>{props.label}:</label>
      {inputType}
    </div>
  );
};

export default Input;
