import React, { Component } from 'react';
import productService from '../../../services/product.sevice';
import  './Products.scss';
import {Link} from 'react-router-dom';


export class Products extends Component {
    constructor(props){
        super(props);
        this.categoryId = this.props.match.params.id;
        this.state={
            products: [],
            preLoaded: false
        };
    }

    componentDidMount(){
        if(this.categoryId){
            this.setState({preLoaded:true});
            productService.getByCategoryId(this.categoryId)
			.then(res => res.json())
			.then(products => this.setState({products}));
        }
        else{
            productService.getAll()
            .then(res => res.json())
            .then(products=>this.setState({products}))
        }

    }

    delete(productId){
        let confirm = window.confirm("are you sure you want to delete?");
        if(confirm===true){
        productService.remove(productId);
        productService.getAll()
        .then(res => res.json())
        .then(products=>this.setState({products}));
        }
    }

    render() {
        return (
            <div>
               <h2>products</h2>
               <div className="d-flex justify-content-end mb-3">
               <Link to={this.state.preLoaded?`/admin/products/create/${this.categoryId}`:"/admin/products/create"} className="btn btn-primary" >Create product</Link>
               </div>
               <table className="table table-striped">
                   <thead>
                       <tr>
                           <th>Image</th>
                           {/* <th>ID</th> */}
                           <th>Title</th>
                           <th>Added</th>
                           <th>Price</th>
                           <th>Options</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.state.products.map(product=>{
                           return <tr key={product.id}>
                               <td><img src={'http://localhost:4000/products/'+ product.image} alt="" className="admin-image"/></td> 
                               {/* <td>{product.id.substring(product.id.length -6)}</td> */}
                               <td><Link to={`/category/${product.categoryId}/product/${product.id}`}>{product.title}</Link> </td>
                                <td>{product.added.substring(0, product.added.indexOf('T'))}</td>
                               <td>${product.price.toFixed(2)}</td>
                               <td><Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
                               <button type="button" onClick={this.delete.bind(this, product.id)}>Delete</button></td>                            
                           </tr>
                       })}
                   </tbody>
               </table>
            </div>
        )
    }
}

export default Products
