import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: // This is dispatched from the login screen when the user clicks the login button
      return { loading: true };
    case USER_LOGIN_SUCCESS: // This is dispatched from the login screen when the user successfully logs in
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL: // This is dispatched from the login screen when the user fails to log in
      return { loading: false, error: action.payload };
    case USER_LOGOUT: // This is dispatched from the header when the user clicks the logout button
      return {};
    default:
      return state;
  }
};
