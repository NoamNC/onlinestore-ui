import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import UserService from "../../services/user.service";
import CreateProduct from './Products/CreatProduct/CreateProducts';
import CreateCategoroy from './Categories/CreateCategory/CreateCategory';
import Edit from "./Categories/EditCategory/EditCategory";
import EditProduct from "./Products/Edit/Edit";
import Users from './Users/Users';
import Product from '../Category/Product/Product';


class Admin extends React.Component {

	componentDidMount() {
		UserService
			.me()
			.then(response => response.json())
			.then(user => {
				if(! user.isAdmin) {
					this.props.history.push('/');
				}
			});
	}

	render() {
		return (
			<Router>
				<div>
					<div className="row">
						<div className="col-sm-3">
							<ul className="list-group">
								<li className="list-group-item">
									<Link to="/admin/products">Products</Link>
								</li>
								<li className="list-group-item">
									<Link to="/admin/categories">Categories</Link>
								</li>
								<li className="list-group-item">
									<Link to="/admin/users">Users</Link>
								</li>
							</ul>
						</div>
						<div className="col-sm-9">
							<Route path="/admin/products" exact component={Products} />
							<Route path="/admin/categories"  exact component={Categories}/>
							<Route path="/admin/users" component={Users} />
							<Route path="/admin/categories/create" component={CreateCategoroy} />
							<Route path="/admin/categories/edit/:id" component={Edit}/>
							<Route path="/admin/products/create" exact component={CreateProduct} />
							<Route path="/admin/products/create/:id" component={CreateProduct} />
							<Route path="/admin/products/edit/:id" component={EditProduct}/>
							<Route path="/admin/categories/:id/products" component={Products} />
							<Route path="/category/:id/product/:id" component={Product} />
						</div>
					</div>
				</div>
			</Router>

		);
	}
}

export default Admin; 