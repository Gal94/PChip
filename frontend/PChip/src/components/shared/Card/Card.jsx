import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div className={`${classes.Card} ${classes[props.additionalClasses]}`}>
      <div className={`${classes.imageTab} ${classes[props.cardImage]}`}>
        <h1 className={classes.cardTitle}>{props.title}</h1>
      </div>
      <div className={`${classes.contentTab}`}>{props.children}</div>
    </div>
  );
};

export default Card;
