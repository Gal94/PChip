import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = (props) => {
    //Be used at the button that links to etsy
    if (props.href) {
        return <a href={props.href}>{props.children}</a>;
    }
    //Be used as the button that keri edits a post
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                onClick={props.cancelOp}
                className={classes[props.additionalClasses]}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={[
                props.iconButton ? classes.IconButton : classes.Button,
                classes[props.additionalClasses],
            ].join(' ')}
            type={props.type}
            onClick={props.clicked}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
