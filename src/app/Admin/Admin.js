import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import UserService from "../../services/user.service";
import CreateProduct from './Products/CreatProduct/CreateProducts';
import CreateCategoroy from './Categories/CreateCategory/CreateCategory';

class Admin extends React.Component {

	// constructor(props) {
	// 	super(props);
	// }

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
							<Route path="/admin/categories/create" component={CreateCategoroy} />
							<Route path="/admin/products/create" component={CreateProduct} />
						</div>
					</div>
				</div>
			</Router>

		);
	}
}

export default Admin; 