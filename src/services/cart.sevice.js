import Network from './network.service';
import cookie from 'react-cookies';


const CART_COOKIE_NAME = 'cart';
const CART_COOKIE_MAX_AGE = 60*60*24*14;

function saveCookie(data){
    cookie.save(CART_COOKIE_NAME, data, {maxAge: CART_COOKIE_MAX_AGE, path: '/'});
}

class cartService extends Network {

    add(productId, quantity){
        let products = this.getAll();
        if(this.isExist(productId)){
            products.forEach(product => {
                if(product.id===productId){
                    product.qty+= quantity;
                }
            });
        }else{
        products.push({
            id: productId,
            qty: quantity
        });
    }
    saveCookie(products);
    }

    remove(productId){
        let products = this.getAll();
        products = products.filter(product => product.id !== productId);
        saveCookie(products);
    }

    isExist(productId){
        return this.getAll().some(product=>product.id===productId);
    }

    clearAll(){
        saveCookie([]);
    }

    getAll(){
        return cookie.load(CART_COOKIE_NAME)|| [];

    }


}



export default new cartService();
