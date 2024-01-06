import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
      qty, // Short hand syntax for qty: qty
    },
  });

  // save the cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// getState allows us to get our entire state tree
export const removeFromCart = (id) => async (dispatch, getState) => {
  // getState allows us to get our entire state tree

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // save the cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
