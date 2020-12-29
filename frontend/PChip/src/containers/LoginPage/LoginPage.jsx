import React, { Component } from 'react';

import Card from '../../components/shared/Card/Card';
import LoginForm from './UserForm/UserForm';
import classes from './LoginPage.module.css';

class LoginPage extends Component {
    render() {
        return (
            <div className={classes.Page}>
                <div className={classes.LoginForm}>
                    <Card
                        additionalClasses='LoginCard'
                        cardImage='loginImage'
                        title='SIGN IN'
                    >
                        <LoginForm />
                    </Card>
                </div>
            </div>
        );
    }
}

export default LoginPage;
