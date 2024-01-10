import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: // if the action type is CART_ADD_ITEM
      const item = action.payload; // set the item to the action payload
      const existItem = state.cartItems.find((x) => x.product === item.product); // check if the item already exists in the cart
      if (existItem) {
        // if the item already exists in the cart
        return {
          ...state, // return the current state
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : x) // if the item exists, replace it with the new item
          )
        };
      } else {
        // if the item does not exist in the cart
        return {
          ...state, // return the current state
          cartItems: [...state.cartItems, item] // add the new item to the cart
        };
      }
    case CART_REMOVE_ITEM: // if the action type is CART_REMOVE_ITEM
      return {
        ...state, // return the current state
        cartItems: state.cartItems.filter((x) => x.product !== action.payload) // filter out the item that matches the action payload
      };
    case CART_SAVE_SHIPPING_ADDRESS: // if the action type is CART_SAVE_SHIPPING_ADDRESS
      return {
        ...state, // return the current state
        shippingAddress: action.payload // set the shipping address to the action payload
      };

    case CART_SAVE_PAYMENT_METHOD: // if the action type is CART_SAVE_PAYMENT_METHOD
      return {
        ...state, // return the current state
        paymentMethod: action.payload // set the payment method to the action payload
      };
    default:
      return state; // return the current state
  }
};
