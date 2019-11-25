import React, { Component } from 'react';
import "./Product.scss";
import productSevice from '../../../services/product.sevice';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';


export class Product extends Component {
constructor(props){
    super(props);
    this.state={
        product: {}
    }
}
    componentDidMount(){
        productSevice.getById(this.props.match.params.id)
        .then(res=>res.json())
        .then(product=>this.setState({product}));
    }

    //i need fix add quantity
    addToCart(){
        this.props.addToCart(this.state.product.id);
    }
    
    render() {
        return (
            <div className="product-product-container">
                <img src={`http://localhost:4000/products/${this.state.product.image}`} alt="" className="product-image"/>
                <div className="product-details-container">
                <h1 className="product-product-title">{this.state.product.title}</h1>
                <span className="product-product-price">${this.state.product.price}</span>
                <p className="product-product-des">{this.state.product.description}</p>
                <button className="btn-add-to-cart" onClick={this.addToCart.bind(this)}>Add to cart</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {
    addToCart
})(Product);
