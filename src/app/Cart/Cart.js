import React from 'react';
import './Cart.scss';
import CartService from '../../services/cart.sevice';
import ProductService from '../../services/product.sevice';
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}

	componentDidMount() {
		this.loadCart();
	}

	loadCart() {
		const cartProducts = CartService.getAll();
		const ids = cartProducts.map(product => product.id);
		ProductService.getByIds(ids)
			.then(res => res.json())
			.then(products => {
				console.log(products)
				products = this.addQuantities(products, cartProducts);
				this.setState({products});
			})
			.catch(error => console.log(error));
	}

	addQuantities(products, cartProducts) {
		let cartObj = {};
		cartProducts.forEach(product => cartObj[product.id] = product.qty);
		products.forEach(product => product.qty = cartObj[product.id]);
		return products;
	}

	calcTotal(products) {
		let total = 0;
		products.forEach(product => {
			total += product.qty * product.price;
		});
		return total;
	}

	remove(productId) {
		CartService.remove(productId);
		this.loadCart();
	}

	render() {
		return (
			<div>
				<h1>Cart</h1>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Sub-total</th>
							<th> </th>
						</tr>
					</thead>
					<tbody>
						{this.state.products.map((product, index) => {
							return <tr key={index}>
								<td><strong>{product.title}</strong></td>
								<td>${product.price.toFixed(2)}</td>
								<td><sub>x</sub>{product.qty}</td>
								<td>${(product.qty * product.price).toFixed(2)}</td>
								<td><button onClick={this.remove.bind(this, product.id)} className="btn btn-danger">X</button></td>
							</tr>
						})}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="3"> </td>
							<td colSpan="2">
								<strong>Total:</strong> ${this.calcTotal(this.state.products).toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</table>
				
			</div>
        );
    }
}
export default Cart;
        