import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: "",
            name: "",
            address: "",
            showCheckOut: false


        }

    }
    handleInput = (e) => {
        debugger;

        this.setState({ [e.target.name]: e.target.value })


    }

    createOrder = (e) => {
        debugger;

        e.preventDefault();
        const order = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            cartItems: this.props.cartItems


        };
        this.props.createOrder(order);
    }

    render() {

        let { cartItems } = this.props;
        debugger;

        return (
            <div>
                { cartItems.length === 0 ?
                    (<div className="cart cart-header">Cart is Empty</div>)
                    :
                    (<div className="cart cart-header">you have {cartItems.length} items in the Cart {" "}</div>)
                }
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map((item) =>
                                (<li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} * {item.count} {" "}
                                            <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                                )
                            )}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (<div className="cart">
                        <div className="total">
                            <div>
                                Total : {""}
                                {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                            </div>
                            <button onClick={() => { this.setState({ showCheckOut: true }) }} className="button primary"> Proceed</button>
                        </div>

                    </div>
                    )}
                    {this.state.showCheckOut && (<div className="cart">

                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label> Email</label>
                                    <input name="email" type="email" required onChange={this.handleInput}></input>
                                    <label> Name</label>
                                    <input name="name" type="text" required onChange={this.handleInput}></input>
                                    <label>Address </label>
                                    <input name="address" type="address" required onChange={this.handleInput}></input>

                                </li>
                                <li>
                                    <button type="submit">CheckOut</button>
                                </li>

                            </ul>

                        </form>



                    </div>)}


                </div>

            </div>
        )
    }
}
