
import CartService from '../../services/cart.sevice';
import {ADD_TO_CART} from './actions';

const initialState={
    cartItemsCount: CartService.getAll().length
};

function reducers(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
            CartService.add(action.productId, 1);
            return{
                cartItemsCount: CartService.getAll().length
            };
        default: 
            return state;
    }
}

export default reducers;