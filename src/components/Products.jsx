import React, { Component } from 'react';
import LeftPanel from './LeftPanel'
import SingleProduct from './SingleProduct';
import { getApi } from '../services/httpServices';
import { NavLink } from 'react-router-dom';

export default class Products extends Component {

  state = {
    productDetails: {}, category: "", products: []
  }

  fetchData = async () => {
    try {
      let { category, prodCode } = this.props.match.params;
      let { products } = this.props;
      let productDetails = prodCode ? await getApi(`/getProductByProdcode/${prodCode}`) : {};
      let filteredProducts = category ? await getApi(`/getProductByCategory/${category}`) : products;
      this.setState({ productDetails, category: category, products: filteredProducts })
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props)
      this.fetchData()
  }

  handleCategory = (category) => {
    this.setState({ category })
    this.props.history.push(`/products/${category}`)
  }

  handleCart = (productDetails) => {
    let { cartArr } = this.props;
    let tempCartArr = [...cartArr];
    let index = tempCartArr.findIndex(a => a.prodCode === productDetails.prodCode);
    if (index >= 0) {
      tempCartArr[index].ingredients = tempCartArr[index].ingredients.map((ing, i) => ({ ...ing, qty: ing.qty + productDetails.ingredients[i].qty }))
      tempCartArr[index].quantity += 1;
    } else {
      tempCartArr.push({ ...productDetails, quantity: 1 })
    }
    this.props.handlingCart(tempCartArr)
  }

  displayingProducts = (products) => {
    return (
      <div className='row my-5'>
        {
          products.map(p =>
            <div className="col-md-6 mb-4 product-image-container">
              <NavLink to={`/products/${p.category}/${p.prodCode}`} activeClassName="active-product-image">
                <img src={p.img} alt={p.title} className='d-block shadow-lg rounded rounded-5 product-image object-fit-cover' />
              </NavLink>
            </div>
          )
        }
      </div>
    )
  }

  render() {
    let { productDetails, category, products } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"><LeftPanel category={category} onCategory={this.handleCategory} /></div>
          <div className="col-md-5">{this.displayingProducts(products)}</div>
          <div className="col-md-1"></div>
          <div className="col-md-4"><SingleProduct productDetails={productDetails} addToCart={this.handleCart} /></div>
        </div>
      </div>
    )
  }
}
