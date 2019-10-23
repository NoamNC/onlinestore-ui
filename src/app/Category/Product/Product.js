import React, { Component } from 'react';
import "./Product.scss";
import productSevice from '../../../services/product.sevice';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions'


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
            <div>
                <h1>product page</h1>
                {this.state.product.title}
                {this.state.product.price}
                <button className="btn-add-to-cart" onClick={this.addToCart.bind(this)}>Add to cart</button>
            </div>
        )
    }
}

export default connect(null, {
    addToCart
})(Product);
