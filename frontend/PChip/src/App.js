import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/layout/Layout';
import Homepage from './containers/Homepage/Homepage';
import Blog from './containers/Blog/Blog';
import { logout, setUser } from './store/actions/auth';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import ControlPanel from './containers/ControlPanel/ControlPanel';
import LoginPage from './containers/LoginPage/LoginPage';

class App extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        const userId = localStorage.getItem('userId');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.props.logoutHandler();
        }
        //CHECK FOR REMAINING SECONDS TO BE ONLINE
        const timeLeft = new Date(expiryDate).getTime() - new Date().getTime();
        //SETUSER
        this.props.setUser(token, userId);
        //LOGOUT AFTER REMAINING SECONDS RAN DOWN
        setTimeout(() => {
            this.props.logoutHandler();
        }, timeLeft);
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/careers' component={Blog} exact />
                    <Route path='/login' component={LoginPage} exact />
                    <Route
                        path='/reset/:token'
                        component={ResetPassword}
                        exact
                    />
                    <Route path='/admin' component={ControlPanel} exact />
                    <Route path='/' component={Homepage} exact />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        expiryDate: state.auth.expiryDate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: () => dispatch(logout()),
        setUser: (token, userId) => dispatch(setUser(token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
