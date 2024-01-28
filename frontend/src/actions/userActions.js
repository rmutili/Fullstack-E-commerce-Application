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
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../constants/userConstants";
// import { get } from "mongoose";
import {
  ORDER_MY_LIST_RESET,
  ORDER_PAY_RESET
} from "../constants/orderConstants";

// getState allows us to get our entire state tree
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
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
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_PAY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
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
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo }
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` // We want to send the token in the headers
      }
    };

    // We want to send a GET request to /api/users/profile
    const { data } = await axios.get(`/api/users/profile/${id}`, config);
    console.log(data);

    // If we get a successful response, we want to dispatch USER_DETAILS_SUCCESS and set the payload to data
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // If we get an error, we want to dispatch USER_DETAILS_FAIL and set the payload to the error message
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo }
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // We want to send the token in the headers
      }
    };

    // We want to send a PUT request to /api/users/profile
    const { data } = await axios.put(`/api/users/profile`, user, config);

    // If we get a successful response, we want to dispatch USER_UPDATE_PROFILE_SUCCESS and set the payload to data
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    // We also want to dispatch USER_LOGIN_SUCCESS and set the payload to data so that the user is logged in immediately after updating their profile
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // We also want to save the user info in local storage so that the user is still logged in after refreshing the page
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // If we get an error, we want to dispatch USER_UPDATE_PROFILE_FAIL and set the payload to the error message
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo }
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` // We want to send the token in the headers
      }
    };

    // We want to send a GET request to /api/users
    const { data } = await axios.get(`/api/users`, config);

    // If we get a successful response, we want to dispatch USER_LIST_SUCCESS and set the payload to data
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    // If we get an error, we want to dispatch USER_LIST_FAIL and set the payload to the error message
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo }
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` // We want to send the token in the headers
      }
    };

    // We want to send a DELETE request to /api/users/:id

    await axios.delete(`/api/users/${id}`, config);

    // If we get a successful response, we want to dispatch USER_DELETE_SUCCESS
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    // If we get an error, we want to dispatch USER_DELETE_FAIL and set the payload to the error message
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    // We want to get the user info from the state
    const {
      userLogin: { userInfo }
    } = getState();

    // We want to send JSON data in the body, so we need to set the content type to application/json

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // We want to send the token in the headers
      }
    };

    // We want to send a PUT request to /api/users/:id

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    // If we get a successful response, we want to dispatch USER_UPDATE_SUCCESS and set the payload to data
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    // We also want to dispatch USER_DETAILS_SUCCESS and set the payload to data
    // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // If we get an error, we want to dispatch USER_UPDATE_FAIL and set the payload to the error message
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message // error.response.data.message is the error message from the backend
    });
  }
};
