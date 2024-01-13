import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET
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
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST: // if the action type is ORDER_PAY_REQUEST
      return {
        loading: true // set loading to true
      };
    case ORDER_PAY_SUCCESS: // if the action type is ORDER_PAY_SUCCESS
      return {
        loading: false, // set loading to false
        success: true // set success to true
      };
    case ORDER_PAY_FAIL: // if the action type is ORDER_PAY_FAIL
      return {
        loading: false, // set loading to false
        error: action.payload // set error to the action payload
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state; // return the current state
  }
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST: // if the action type is ORDER_MY_LIST_REQUEST
      return {
        ...state,
        loading: true // set loading to true
      };
    case ORDER_MY_LIST_SUCCESS: // if the action type is ORDER_MY_LIST_SUCCESS
      return {
        loading: false, // set loading to false
        orders: action.payload // set orders to the action payload
      };
    case ORDER_MY_LIST_FAIL: // if the action type is ORDER_MY_LIST_FAIL
      return {
        loading: false, // set loading to false
        error: action.payload // set error to the action payload
      };
    case ORDER_MY_LIST_RESET:
      return { orders: [] };
    default:
      return state; // return the current state
  }
};
