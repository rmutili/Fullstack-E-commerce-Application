import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";

// getState allows us to get our entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // getState allows us to get our entire state tree

  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty // Short hand syntax for qty: qty
    }
  });

  // save the cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// getState allows us to get our entire state tree
export const removeFromCart = (id) => async (dispatch, getState) => {
  // getState allows us to get our entire state tree

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  // save the cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  // save the shipping address to localStorage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  // save the payment method to localStorage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
