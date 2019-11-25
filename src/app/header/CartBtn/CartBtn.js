import React from 'react';
import './CartBtn.scss'
import {connect} from 'react-redux';


class CartButton extends React.Component {



	render() {
		return (
			<div className="CartButton badge badge-light">
				({this.props.itemCount})
			</div>
		);
	}
}

const mapStateToProps =(state)=>{
	return {
		itemCount: state.cartItemsCount
	};
}
export default connect(mapStateToProps)(CartButton); 