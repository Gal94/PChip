import React from 'react';

import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <li className={classes.Item}>
            <NavLink
                to={props.link}
                exact={props.exact}
                activeStyle={{
                    backgroundColor: '#ffd36925',
                    borderBottom: '4px solid #ffd369a6',
                    color: 'white',
                }}
            >
                <p className={classes.ItemText}>{props.children}</p>
            </NavLink>
        </li>
    );
};

export default NavItem;
