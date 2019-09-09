import React, { Component } from 'react';
import cartService from "../../../services/cart.sevice";


export class CartBtn extends Component {
    constructor(props){
        super(props);
        this.state={
            qty: cartService.getAll().length
        }
    }

    render() {
        return (
            <span class="badge badge-secondary">{this.state.qty}</span>
        )
    }
}

export default CartBtn;
