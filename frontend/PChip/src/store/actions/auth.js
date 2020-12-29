import * as actionTypes from './actionTypes';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_START, redirectTo: undefined });
    try {
      let user = {
        email: email,
        password: password,
      };
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/poweruser/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      let responseData = await response.json();
      if (response.status === 200) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          token: responseData.token,
          userId: responseData.userId,
          redirectTo: '/',
        });

        //STORE IN LOCAL STORAGE
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setTimeout(() => {
          logout();
        }, remainingMilliseconds);
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAILED,
          errorMessage: responseData.message,
          redirectTo: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
        errorMessage: 'There was an error with the request, please try again.',
        redirectTo: undefined,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };
};

export const setUser = (token, userId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_USER, token: token, userId: userId });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REQ_RESET });
    try {
      let body = {
        email: email,
      };
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/poweruser/reset`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        const responseData = await response.json();
        return dispatch({
          type: actionTypes.REQ_RESET_FAILED,
          errorMessage: responseData.message,
        });
      }
      //HANDLE SUCCESS

      return dispatch({
        type: actionTypes.REQ_RESET_SUCCESS,
      });
    } catch (error) {
      return dispatch({
        type: actionTypes.REQ_RESET_FAILED,
        errorMessage: 'There was an error with the request, please try again.',
      });
    }
  };
};

export const changePassword = (password, token, userId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REQ_RESET });
    try {
      let body = {
        newPass: password,
        passToken: token,
        userId: userId,
      };
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/poweruser/newPassword`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status !== 200) {
        return dispatch({ type: actionTypes.REQ_RESET_FAILED });
      }
      //Changed password successfully
      return dispatch({ type: actionTypes.PASS_CHANGE_SUCCESS });
    } catch (error) {
      return dispatch({ type: actionTypes.REQ_RESET_FAILED });
    }
  };
};

export const getForm = (passwordToken) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REQ_RESET });
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/poweruser/${passwordToken}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      );

      if (response.status !== 200) {
        return dispatch({ type: actionTypes.REQ_RESET_FAILED });
      }

      const responseData = await response.json();
      return dispatch({
        type: actionTypes.GET_FORM_SUCCESS,
        resetPassToken: responseData.passToken,
        userId: responseData.userId,
      });
    } catch (error) {
      return dispatch({ type: actionTypes.REQ_RESET_FAILED });
    }
  };
};
