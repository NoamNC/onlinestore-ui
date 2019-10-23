import React, { Component } from 'react';
import productService from '../../../services/product.sevice';
import  './Products.scss';
import {Link} from 'react-router-dom';


export class Products extends Component {
    constructor(props){
        super(props)
        this.state={
            products: []
        };
    }

    componentDidMount(){
        productService.getAll()
            .then(res => res.json())
            .then(products=>this.setState({products}))
    }

    render() {
        return (
            <div>
               <h2>products</h2>
               <div className="d-flex justify-content-end mb-3">
               <Link to="/admin/products/create" className="btn btn-primary" >Create product</Link>
               </div>
               <table className="table table-striped">
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>Title</th>
                           <th>Price</th>
                           <th>Options</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.state.products.map(product=>{
                           return <tr key={product.id}>
                               <td>{product.id.substring(product.id.length -6)}</td>
                               <td>{product.title}</td>
                               <td>${product.price.toFixed(2)}</td>
                               <td><img src={'http://localhost:4000/products/'+ product.image} alt=""/></td>                             
                               
            
                           </tr>
                       })}
                   </tbody>
               </table>
            </div>
        )
    }
}

export default Products
