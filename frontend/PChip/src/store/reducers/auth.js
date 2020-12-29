import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  token: null,
  resetPassToken: null,
  errorMessage: undefined,
  userId: null,
  authLoad: null,
  authError: null,
  resetError: null,
  redirectTo: null,
  resetPassSuccess: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        authLoad: true,
        authError: false,
        redirectTo: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        authLoad: false,
        errorMessage: null,
        isAuth: true,
        redirectTo: action.redirectTo,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        authLoad: false,
        authError: true,
        errorMessage: action.errorMessage,
        redirectTo: null,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        userId: action.userId,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: null,
        userId: null,
      };
    case actionTypes.REQ_RESET:
      return {
        ...state,
        resetError: false,
        errorMessage: undefined,
        resetPassSuccess: null,
      };
    case actionTypes.REQ_RESET_SUCCESS:
      return {
        ...state,
        errorMessage: null
      };
    case actionTypes.REQ_RESET_FAILED:
      return {
        ...state,
        resetError: true,
        errorMessage: action.errorMessage,
      };
    case actionTypes.GET_FORM_SUCCESS:
      return {
        ...state,
        resetPassToken: action.resetPassToken,
        userId: action.userId,
      };
    case actionTypes.PASS_CHANGE_SUCCESS:
      return {
        ...state,
        resetPassToken: null,
        resetPassSuccess: true,
      };
    case actionTypes.RESET_ERRORS:
      return {
        ...state,
        authLoad: false,
        resetError: false,
        errorMessage: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
