import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes";

const cart = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((c) => c.id === item.id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((c) =>
            c.id === existItem.id ? item : c
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.id !== action.payload),
      };

    default:
      return state;
  }
};

export default cart;
