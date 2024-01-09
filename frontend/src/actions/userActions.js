import axios from "axios";
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
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

// getState allows us to get our entire state tree
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.response.data.message is the error message from the backend
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // We want to send a POST request to /api/users, and we want to send the name, email, and password in the body
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    // If we get a successful response, we want to dispatch USER_REGISTER_SUCCESS and set the payload to data
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // We also want to dispatch USER_LOGIN_SUCCESS and set the payload to data so that the user is logged in immediately after registering
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // We also want to save the user info in local storage so that the user is still logged in after refreshing the page
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // If we get an error, we want to dispatch USER_REGISTER_FAIL and set the payload to the error message
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.response.data.message is the error message from the backend
    });
  }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // We want to send the token in the headers
      },
    };

    // We want to send a GET request to /api/users/profile
    const { data } = await axios.get(`/api/users/profile`, config);

    // If we get a successful response, we want to dispatch USER_DETAILS_SUCCESS and set the payload to data
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // If we get an error, we want to dispatch USER_DETAILS_FAIL and set the payload to the error message
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.response.data.message is the error message from the backend
    });
  }
};
