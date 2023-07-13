import React, { Component } from 'react'
import { getUser } from '../services/authServices';
import { withRouter } from 'react-router-dom';

class SingleProduct extends Component {


  deleteProduct = (code, category) => {
    this.props.history.push(`/product/delete/${category}/${code}`)
  }

  editProduct = (code, category) => {
    this.props.history.push(`/products/${category}/${code}/edit`)
  }

  showProduct = (productDetails) => {
    let user = getUser()
    return (
      <div className='row my-5'>
        <div className="card p-0">
          <img src={productDetails.img} className="card-img-top shadow" alt={productDetails.title} />
          <div className="card-body">
            <h2 className="card-title text-center fw-bold alert alert-secondary">{productDetails.title}</h2>
            <div className="card-text">
              {
                productDetails.desc.length > 0 && (
                  <div className='desc-group border border-success rounded p-3 my-4'>
                    <h4>Product Description</h4>
                    {productDetails.desc.map((d, index) => <p className='m-0' key={index}>- {d}</p>)}
                  </div>
                )
              }
              {
                productDetails.ingredients.length > 0 && (
                  <div className='desc-group border border-success rounded p-3'>
                    <h4>Items In Product</h4>
                    {
                      productDetails.ingredients.map((ing, index) =>
                        <p className='m-0' key={index}>~ <span>{ing.ingName} : {ing.qty}</span></p>
                      )
                    }
                  </div>
                )
              }
              <div className='mt-4'>
                {
                  user?.role === 'user' ? (<button type='button' className='btn btn-success w-100' onClick={() => this.props.addToCart(productDetails)}>Add To Cart</button>) : user?.role === 'admin' ? (
                    <div className="row">
                      <div className='d-flex gap-3'>
                        <button type='button' className='btn btn-warning w-100' onClick={() => this.editProduct(productDetails.prodCode, productDetails.category)}>Edit Product</button>
                        <button type='button' className='btn btn-danger w-100' onClick={() => this.deleteProduct(productDetails.prodCode, productDetails.category)}>Delete Product</button>
                      </div>
                    </div>
                  ) : ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let { productDetails } = this.props;
    return (
      <div className="container">
        <div className="row">
          {
            Object.keys(productDetails).length === 0 ? <h1 className='alert alert-success text-center fw-bold my-5' role='alert'>Choose A Product</h1> : this.showProduct(productDetails)
          }
        </div>
      </div>
    )
  }
}


export default withRouter(SingleProduct)