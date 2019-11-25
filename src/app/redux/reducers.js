import CartService from "../../services/cart.sevice";
import { ADD_TO_CART, LOGGED_IN, LOG_OUT, REMOVE_FROM_CART } from "./actions";
import UserService from '../../services/user.service';



const initialState = {
  cartItemsCount: CartService.getAll().length,
  loggedIn: UserService.isLogged()
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      CartService.add(action.productId, 1);
      return {
        cartItemsCount: CartService.getAll().length,
        loggedIn: UserService.isLogged()
      };
      case REMOVE_FROM_CART:
        CartService.remove(action.productId);
        return{
          cartItemsCount: CartService.getAll().length,
          loggedIn: UserService.isLogged()
      }
    case LOG_OUT:
      return {
        loggedIn: false,
        cartItemsCount: CartService.getAll().length
      };
    case LOGGED_IN:
      return {
        loggedIn: true,
        cartItemsCount: CartService.getAll().length
      };

    default:
      return state;
  }
}

export default reducers;
