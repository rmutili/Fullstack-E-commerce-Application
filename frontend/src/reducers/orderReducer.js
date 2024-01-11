import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: // if the action type is ORDER_CREATE_REQUEST
      return {
        ...state,
        loading: true // set loading to true
      };
    case ORDER_CREATE_SUCCESS: // if the action type is ORDER_CREATE_SUCCESS
      return {
        loading: false, // set loading to false
        success: true, // set success to true
        order: action.payload // set order to the action payload
      };
    case ORDER_CREATE_FAIL: // if the action type is ORDER_CREATE_FAIL
      return {
        loading: false, // set loading to false
        error: action.payload // set error to the action payload
      };
    default:
      return state; // return the current state
  }
};

export const orderDetailsReducer = (
  state = { loading: true }, // set the initial state
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: // if the action type is ORDER_DETAILS_REQUEST
      return {
        ...state,
        loading: true // set loading to true
      };
    case ORDER_DETAILS_SUCCESS: // if the action type is ORDER_DETAILS_SUCCESS
      return {
        loading: false, // set loading to false
        order: action.payload // set order to the action payload
      };
    case ORDER_DETAILS_FAIL: // if the action type is ORDER_DETAILS_FAIL
      return {
        loading: false, // set loading to false
        error: action.payload // set error to the action payload
      };
    default:
      return state; // return the current state
  }
};
