import React, { Component } from 'react';
import cartService from "../../services/cart.sevice";
import productService from '../../services/product.sevice';

export class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            products: []
        }
    }
    componentDidMount(){
        this.loadCart();
    }

    loadCart(){
        const cartProducts = cartService.getAll();
        const ids = cartProducts.map(product=> product.id) ;
        productService.getByIds(ids)
        .then(res=>res.json())
        .then(products=>{
            products=this.addQuantities(products, cartService.getAll());
            this.setState({products});
    })
        .catch(err=>console.log(err));
    }

    addQuantities(products, cartProducts){
        let cartObj ={};
        cartProducts.forEach(product=>cartObj[product.id]= product.qty);
        products.forEach(product=>product.qty=cartObj[product.id]);
        return products;
    }

    removeItem(productId){
        cartService.remove(productId);
        this.loadCart();
    }

calcTotal(products){
    let total = 0;
    products.forEach(product=>{
        total+=product.qty*product.price;
    });
    return total;
}

    render() {
        return (
            <div>
                <h1>Cart:</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub-total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map( (product, index)=>{
                            return <tr key={index}> 
                                <td><strong>{product.title}</strong></td>
                                <td>${product.price.toFixed(2)}</td>
                                <td><sub>x</sub>{product.qty}</td>
                                <td>${(product.qty*product.price).toFixed(2)}</td>
                                <td><button onClick={this.removeItem.bind(this, product.id)} className="btn btn-danger">x</button></td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td><strong>Total: </strong>
                            ${this.calcTotal(this.state.products).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Cart
