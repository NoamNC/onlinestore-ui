export const ADD_TO_CART = 'ADD_TO_CART';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export function addToCart(productId){
    return{
        type: ADD_TO_CART,
        productId
    };
}

export function removeFromCart(productId){
    return{
        type: REMOVE_FROM_CART,
        productId
    };
}

export function LogIn(){
    return{
        type: LOGGED_IN,
    };
}

export function LogOut(){
    return{
        type: LOG_OUT
    };
}