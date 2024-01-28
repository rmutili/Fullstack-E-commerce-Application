import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET
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
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: // This is dispatched from the register screen when the user clicks the register button
      return { loading: true };
    case USER_REGISTER_SUCCESS: // This is dispatched from the register screen when the user successfully registers
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL: // This is dispatched from the register screen when the user fails to register
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// getState allows us to get our entire state tree
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST: // This is dispatched from the profile screen when the profile screen loads
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS: // This is dispatched from the profile screen when the user details are successfully retrieved
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL: // This is dispatched from the profile screen when the user details fail to be retrieved
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET: // This is dispatched from the profile screen when the user clicks the logout button or when the user clicks the update button
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST: // This is dispatched from the profile screen when the user clicks the update button
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS: // This is dispatched from the profile screen when the user details are successfully updated
      return { loading: false, user: action.payload, success: true };
    case USER_UPDATE_PROFILE_FAIL: // This is dispatched from the profile screen when the user details fail to be updated
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET: // This is dispatched from the profile screen when the user clicks the logout button
      return { user: {} };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST: // This is dispatched from the user list screen when the user list screen loads
      return { ...state, loading: true };
    case USER_LIST_SUCCESS: // This is dispatched from the user list screen when the user list is successfully retrieved
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL: // This is dispatched from the user list screen when the user list fails to be retrieved
      return { loading: false, error: action.payload };
    case USER_LIST_RESET: // This is dispatched from the user list screen when the user clicks the logout button
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST: // This is dispatched from the user list screen when the user clicks the delete button
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS: // This is dispatched from the user list screen when the user is successfully deleted
      return { loading: false, success: true };
    case USER_DELETE_FAIL: // This is dispatched from the user list screen when the user fails to be deleted
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: // This is dispatched from the user edit screen when the user clicks the update button
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS: // This is dispatched from the user edit screen when the user is successfully updated
      // return { loading: false, success: true };
      return { loading: false, user: action.payload };
    case USER_UPDATE_FAIL: // This is dispatched from the user edit screen when the user fails to be updated
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET: // This is dispatched from the user edit screen when the user clicks the logout button
      return { user: {} };
    default:
      return state;
  }
};
