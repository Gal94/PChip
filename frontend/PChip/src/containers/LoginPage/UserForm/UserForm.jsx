import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Button from '../../../components/shared/Button/Button';
import Input from '../../../components/shared/Input/Input';
import classes from './UserForm.module.css';
import {
    login,
    resetPassword,
    changePassword,
} from '../../../store/actions/auth';
import MessageBox from '../../../components/shared/MessageBox/MessageBox';
import { RESET_ERRORS } from '../../../store/actions/actionTypes';

class LoginForm extends Component {
    state = {
        formType: this.props.resetForm || 'login',
        sentEmail: false,
        fields: {
            email: {
                value: '',
                label: 'email',
                inputType: 'email',
            },
            password: {
                value: '',
                label: 'password',
                inputType: 'password',
            },
            confirmPassword: {
                value: '',
                label: 'Confirm Password',
                inputType: 'password',
            },
        },
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        //DISPATCHER LOGIN
        if (this.state.formType === 'login') {
            return this.props.onLoginHandler(
                this.state.fields.email.value,
                this.state.fields.password.value
            );
        } else if (this.state.formType === 'reset') {
            //DISPATCHER RESET PASSWORD
            //TODO notify user that an email has been sent
            this.props.onResetHandler(this.state.fields.email.value);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    sentEmail: true,
                };
            });
        } else if (this.state.formType === 'changePass') {
            //Dispatch the change password action - TODO Display error message

            if (
                this.state.fields.password.value.length >= 6 &&
                this.state.fields.password.value.length <= 15 &&
                this.state.fields.password.value ===
                    this.state.fields.confirmPassword.value
            ) {
                this.props.onPasswordResetHandler(
                    this.state.fields.password.value,
                    this.props.match.params.token,
                    this.props.userId
                );
            }
        }
    };

    formToggleHandler = (event) => {
        event.preventDefault();
        this.props.resetErrorsHandler();
        //Resets the fields back to empty
        const inputForm = { ...this.state.fields };
        inputForm.email.value = '';
        inputForm.password.value = '';

        this.setState((prevState) => {
            if (prevState.formType === 'login') {
                console.log('here');
                return {
                    formType: 'reset',
                    fields: inputForm,
                    sentEmail: false,
                };
            } else {
                return {
                    formType: 'login',
                    fields: inputForm,
                    sentEmail: false,
                };
            }
        });
    };

    inputChangedHandler = (event, formField) => {
        //DEEP COPY
        const inputForm = { ...this.state.fields };
        const inputElementToChange = { ...inputForm[formField] };
        inputElementToChange.value = event.target.value;

        inputForm[formField] = inputElementToChange;

        //ALSO CHECK FOR VALIDITY
        this.setState({ fields: inputForm });
    };

    render() {
        let errorBox = null;
        let sentEmailNotif = null;
        if (
            (this.props.authError || this.props.resetError) &&
            this.props.errorMessage
        ) {
            errorBox = <MessageBox>{this.props.errorMessage}</MessageBox>;
        } else if (
            this.state.sentEmail &&
            this.props.errorMessage !== undefined &&
            this.state.formType === 'reset'
        ) {
            // TODO :: CSS
            sentEmailNotif = (
                <MessageBox emailSent>
                    <p>
                        Email has been sent successfully, please follow the
                        steps as instructed in the email
                    </p>
                </MessageBox>
            );
        }

        // Login form - default sign in
        let formElements = (
            <div className={classes.Form}>
                <Input
                    type='email'
                    label='email'
                    value={this.state.fields.email.value}
                    onInputChange={(event) =>
                        this.inputChangedHandler(event, 'email')
                    }
                />
                <Input
                    type='password'
                    label='password'
                    value={this.state.fields.password.value}
                    onInputChange={(event) =>
                        this.inputChangedHandler(event, 'password')
                    }
                />
                <Button additionalClasses='Login' type='submit'>
                    LOGIN
                </Button>
                <div className={classes.ResetContainer}>
                    <p className={classes.Reset}>
                        Forgot password?
                        <button
                            type='button'
                            className={classes.resetButton}
                            onClick={this.formToggleHandler}
                        >
                            click here
                        </button>
                    </p>
                </div>
            </div>
        );

        // Reset password form
        if (this.state.formType === 'reset') {
            formElements = (
                <div className={classes.Form}>
                    <h1 className={classes.title}>Reset password</h1>
                    <Input
                        type='email'
                        label='email'
                        value={this.state.fields.email.value}
                        onInputChange={(event) =>
                            this.inputChangedHandler(event, 'email')
                        }
                    />
                    <Button additionalClasses='Login' type='submit'>
                        RESET PASSWORD
                    </Button>
                    <div className={classes.ResetContainer}>
                        <button
                            type='button'
                            className={`${classes.resetButton} ${classes.Reset}`}
                            onClick={this.formToggleHandler}
                        >
                            Back to login screen
                        </button>
                    </div>
                </div>
            );

            // Change pass form
        } else if (this.state.formType === 'changePass') {
            formElements = (
                <div className={classes.Form}>
                    <Input
                        type='password'
                        value={this.state.fields.password.value}
                        label='password'
                        onInputChange={(event) =>
                            this.inputChangedHandler(event, 'password')
                        }
                    />
                    <Input
                        type='password'
                        value={this.state.fields.confirmPassword.value}
                        label='Confirm Password'
                        onInputChange={(event) =>
                            this.inputChangedHandler(event, 'confirmPassword')
                        }
                    />
                    <Button additionalClasses='ChangePassword' type='submit'>
                        CHANGE PASSWORD
                    </Button>
                </div>
            );
        }

        let page = <form onSubmit={this.onSubmitHandler}>{formElements}</form>;

        // Redirect if password has been changed or logged in
        if (this.props.redirectTo || this.props.resetSuccess) {
            page = <Redirect to={this.props.redirectTo || `/`} />;
        }

        return (
            <React.Fragment>
                {/* Redirects to main page if logged in */}
                {localStorage.getItem('token') ? <Redirect to='/' /> : null}

                {/* If there's an error display the error box */}
                {errorBox}
                {sentEmailNotif}
                {page}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        resetError: state.auth.resetError,
        errorMessage: state.auth.errorMessage,
        redirectTo: state.auth.redirectTo,
        resetSuccess: state.auth.resetPassSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginHandler: (email, password) => dispatch(login(email, password)),
        onResetHandler: (email) => dispatch(resetPassword(email)),
        onPasswordResetHandler: (password, token, userId) =>
            dispatch(changePassword(password, token, userId)),
        resetErrorsHandler: () => dispatch({ type: RESET_ERRORS }),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
