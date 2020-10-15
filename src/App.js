import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []
    };


  }
  createOrder = (order) => {

    alert("hi your order is here" + " " + order.name);



  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item._id !== product._id)))
  }

  addToCart = (product) => {
    console.log(product._id);
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {

      cartItems.push({ ...product, count: 1 })
    }
    debugger;
    console.log(cartItems);

    this.setState({
      cartItems: cartItems
    })

    localStorage.setItem("cartItems", JSON.stringify(cartItems))

  }

  SortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        return sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1 : sort === "highest" ? a.price < b.price ? 1 : -1 : a._id > b._id ? 1 : -1
      })
    })
  }

  FilterProducts = (event) => {
    console.log(event.target.value);
    console.log(data.products);
    debugger;
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products })
    } else if (event.target.value === "All") {
      this.setState({
        size: event.target.value,
        products: data.products
      })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter((product) => {
          return product.availableSizes.indexOf(event.target.value) >= 0
        })

      })
    }
  }

  render() {
    debugger;

    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                SortProducts={this.SortProducts}
                FilterProducts={this.FilterProducts} />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          All Right Reserved
      </footer>
      </div>
    );
  }
}

export default App;
