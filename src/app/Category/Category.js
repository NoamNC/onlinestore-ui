import React from 'react';
import ProductService from '../../services/product.sevice';
import './Category.scss';
import { Link } from "react-router-dom";
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
			.then(products => this.setState({products}));
	}
	render() {
		return (
			<div>
				{this.state.products.map((product, index) => {
					return <div className="product">
						<img src={'http://localhost:4000/products/' + product.image} alt=""/>
						<Link to={`/category/${this.categoryId}/product/${product.id}`} key={index}>{product.title}</Link>
					</div>;
				})}
			</div>
		);
	}
}
export default Category;