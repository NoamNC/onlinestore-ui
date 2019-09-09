import React, { Component } from 'react'
import "./Category.scss";
import ProductService from "../../services/product.sevice"
import {Link} from "react-router-dom";

export class Category extends Component {
constructor(props){
    super(props);
    this.categoryId = this.props.match.params.id;
    this.state={
        products: []
    }
}

componentDidMount(){
    ProductService.getByCategoryId(this.categoryId)
    .then(res=>res.json())
    .then(products=>this.setState({products}));
}

    render() {
        return (
            <div>
                {this.state.products.map((product, index)=>{
                    return <Link to={`/category/${this.categoryId}/product/${product.id}`} className="product" key={index}>{product.title} </Link>;
                })}
            </div>
        )
    }
}

export default Category;
