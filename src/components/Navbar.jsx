import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    let { user } = this.props;
    return (
      <>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary px-5">
            <Link className="navbar-brand fw-bold fs-4 text-light" to="/products">FurnitureStore</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active fw-bold fs-5" aria-current="page" to="/products">Products</Link>
                </li>
                {
                  user?.role === 'user' ? (
                    <li className="nav-item">
                      <Link className="nav-link active fw-bold fs-5" aria-current="page" to="/cart">Cart</Link>
                    </li>
                  ) : user?.role === 'admin' ? (
                    <li className="nav-item">
                      <Link className="nav-link active fw-bold fs-5" aria-current="page" to="/products/new">Add New Product</Link>
                    </li>
                  ) : ""
                }
              </ul>
              <form className="d-flex" role="search">
                {
                  user ? (<Link className="btn btn-danger text-dark shadow fw-bold" to="/sign-out">Sign Out</Link>) : (<Link className="btn btn-warning shadow fw-bold" to="/sign-in">Sign In</Link>)
                }
              </form>
            </div>
          </nav>
        </div>
      </>
    )
  }
}
