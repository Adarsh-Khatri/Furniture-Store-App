import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import DeleteProduct from './DeleteProduct';
import AddProduct from './AddProduct';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import Home from './Home';
import { getApi } from '../services/httpServices';
import { getUser } from '../services/authServices';


export default class MainComponent extends Component {

  state = {
    products: [], cartArr: []
  }

  fetchData = async () => {
    try {
      let products = await getApi('/products')
      this.setState({ products })
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  handlingCart = (arr) => {
    this.setState({ cartArr: arr })
  }

  render() {
    let { products, cartArr } = this.state;
    let user = getUser()
    return (
      <div className="container-fluid">

        <Navbar user={user} />

        <Switch>

          <Route path="/cart" render={props => <Cart {...props} cartArr={cartArr} products={products} handlingCart={this.handlingCart} />} />

          <Route path="/product/delete/:category/:code" render={props => user ? user.role == 'admin' ? <DeleteProduct {...props} /> : <Redirect to="/notfound" /> : <Redirect to="/sign-in" />} />

          <Route path="/products/:category/:prodCode/edit" render={props => user ? user.role == 'admin' ? <AddProduct {...props} /> : <Redirect to="/notfound" /> : <Redirect to="/sign-in" />} />

          <Route path="/products/new" render={props => user ? user.role == 'admin' ? <AddProduct {...props} /> : <Redirect to="/notfound" /> : <Redirect to="/sign-in" />} />

          <Route path="/sign-in" render={props => <Login {...props} />} />

          <Route path="/sign-out" render={props => <Logout {...props} />} />

          <Route path="/products/:category/:prodCode?" render={props => <Products {...props} products={products} cartArr={cartArr} handlingCart={this.handlingCart} />} />

          <Route path="/products" render={props => <Products {...props} products={products} cartArr={cartArr} handlingCart={this.handlingCart} />} />

          <Route path="/notfound" component={NotFound} />

          <Route path="/" component={Home} />

          <Redirect to="/" />

        </Switch>

      </div>
    )
  }
}



