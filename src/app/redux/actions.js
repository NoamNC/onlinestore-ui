export const ADD_TO_CART = 'ADD_TO_CART' 

export function addToCart(productId){
    return{
        type: ADD_TO_CART,
        productId
    };
}