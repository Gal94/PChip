import React from 'react';

import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import classes from './PaintingCard.module.css';

const PaintingCard = (props) => (
    <div className={classes.Card}>
        <Card cardImage='noImage' additionalClasses='teamCard'>
            <div className={classes.CardContainer}>
                <div
                    onClick={props.modifyHandler}
                    className={classes.InnerContainer}
                >
                    <div className={classes.ImageContainer}>
                        <img
                            className={classes.Image}
                            src={`https://${process.env.REACT_APP_API_URL}/${props.image}`}
                            alt={props.name}
                        />
                    </div>
                    <div style={{ minWidth: '70%', maxWidth: '70%' }}>
                        <h2 className={classes.memberName}>{props.name}</h2>
                        <h2 className={classes.memberPosition}>
                            {props.position}
                        </h2>
                    </div>
                </div>
                <div className={classes.DeleteContainer}>
                    <Button iconButton clicked={props.deleteHandler}>
                        <i
                            className={`fas fa-times fa-lg ${classes.Delete}`}
                        ></i>
                    </Button>
                </div>
            </div>
        </Card>
    </div>
);
export default PaintingCard;
