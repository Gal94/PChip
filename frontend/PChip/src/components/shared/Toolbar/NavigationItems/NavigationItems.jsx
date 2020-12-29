import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavItem from '../NavItem/NavItem';
import { logout } from '../../../../store/actions/auth';

const NavigationItems = (props) => {
    // Logs user out and redirects back to homepage
    let onLogoutClickHandler = () => {
        props.logoutHandler();
        props.history.push('/');
    };

    return (
        <ul className={classes.NavigationItems}>
            <NavItem link='/' exact>
                Home
            </NavItem>
            <NavItem link='/careers' exact>
                Careers
            </NavItem>
            {props.isAuth && (
                <NavItem link='/admin' exact>
                    Admin
                </NavItem>
            )}
            {props.isAuth && (
                <li className={classes.Logout}>
                    <button
                        className={classes.LogoutButton}
                        onClick={onLogoutClickHandler}
                    >
                        Logout
                    </button>
                </li>
            )}
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: () => dispatch(logout()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NavigationItems)
);
