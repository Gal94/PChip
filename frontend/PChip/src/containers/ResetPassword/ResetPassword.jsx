import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../../components/shared/Card/Card';
import classes from './ResetPassword.module.css';
import UserForm from '../LoginPage/UserForm/UserForm';
import { getForm } from '../../store/actions/auth';
import Spinner from '../../hoc/Spinner/Spinner';
import Button from '../../components/shared/Button/Button';

class ResetPassword extends Component {
  async componentDidMount() {
    this.props.getForm(this.props.match.params.token);
  }

  render() {
    let userForm = <Spinner />;

    if (this.props.resetError) {
      userForm = (
        <Card
          additionalClasses='LoginCard'
          cardImage='loginImage'
          title='Reset Password'
        >
          <div className={classes.Container}>
            <p className={classes.ErrorText}>
              UH OH! How have we ended up here?{' '}
              <br />
              This link has expired, please try to reset your password again.
            </p>
            <Button to='/login' additionalClasses='Reset'>
              Click here to return back
            </Button>
          </div>
        </Card>
      );
    } else if (this.props.userId) {
      userForm = (
        <Card
          additionalClasses='LoginCard'
          cardImage='loginImage'
          title='Change Password'
        >
          <UserForm userId={this.props.userId} resetForm='changePass' />
        </Card>
      );
    }

    return (
      <div className={classes.Page}>
        <div className={classes.Form}>{userForm}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resetError: state.auth.resetError,
    userId: state.auth.userId,
    resetToken: state.auth.resetPassToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (passwordToken) => dispatch(getForm(passwordToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
