import React from "react";
import ProductService from "../../services/product.sevice";
import "./Category.scss";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions';
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.categoryId = this.props.match.params.id;
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    ProductService.getByCategoryId(this.categoryId)
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  addToCart(productId){
	this.props.addToCart(productId);
}

  render() {
    return (
      <div className="categories-container">
        {this.state.products.map((product, index) => {
          return (
            <div className="product-container">
              <Link
                className="link"
                to={`/category/${this.categoryId}/product/${product.id}`}
                key={index}
              >
                <img
                  src={"http://localhost:4000/products/" + product.image}
                  alt=""
                  className="product-image"
                />

                <span className="product-title">{product.title}</span>
              </Link>		  
              <span className="product-price">${product.price}</span>
			  <button className="btn-add-to-cart" onClick={this.addToCart.bind(this, product.id)}>Add to cart</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(null, {
    addToCart
})(Category);
