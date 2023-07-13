import React, { Component } from 'react'

export default class Cart extends Component {

  handleQuantity = (code, num) => {
    let { cartArr, products } = this.props;
    let tempCartArr = [...cartArr];
    let index = tempCartArr.findIndex(a => a.prodCode === code);
    let pIndex = products.findIndex(a => a.prodCode === code);
    if (index >= 0) {
      tempCartArr[index].ingredients = tempCartArr[index].ingredients.map((ing, i) => ({ ...ing, qty: ing.qty + (num * products[pIndex].ingredients[i].qty) }));
      tempCartArr[index].quantity += num;
    }
    if (tempCartArr[index].quantity === 0) {
      tempCartArr.splice(index, 1)
    }
    this.props.handlingCart(tempCartArr)
  }

  showShoppingCart = (cartArr) => {
    console.log(cartArr);
    return (
      <>
        <div className="row mt-5">
          <h1 className='text-center fw-bold alert alert-info' role='alert'>Products In Shopping Cart</h1>
        </div>
        {
          cartArr.map(item =>
            <div className="row bg-light border rounded rounded-3 align-items-center">
              <div className="col-md-2">
                <img src={item.img} className="card-img-top shadow my-3" alt={item.title} />
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-6">
                <h2 className="fw-bold">{item.title}</h2>
              </div>
              <div className="col-md-2">
                <button type='button' className='btn btn-danger fw-bold' onClick={() => this.handleQuantity(item.prodCode, -1)}>-</button><button type='button' className='btn btn-warning fw-bold mx-3' readOnly disabled>{item.quantity}</button><button type='button' className='btn btn-success fw-bold' onClick={() => this.handleQuantity(item.prodCode, 1)}>+</button>
              </div>
            </div>
          )
        }
      </>
    )
  }


  showSummary = (ingAndQtyArr) => {
    return (
      <div className='my-5'>
        <div className="row"><h1 className='text-center fw-bold '>List Of Items In Cart</h1></div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3 rounded-start bg-dark text-light lead fw-bold text-center py-2 ">Item Name</div>
          <div className="col-md-3 rounded-end bg-dark text-light lead fw-bold text-center py-2 ">Count</div>
          <div className="col-md-3"></div>
        </div>
        {
          ingAndQtyArr.map(ing =>
            <div className="row text-center lead">
              <div className="col-md-3"></div>
              <div className="col-md-3 border">{ing.ingName}</div>
              <div className="col-md-3 border">{ing.qty}</div>
              <div className="col-md-3"></div>
            </div>)
        }
      </div>
    )
  }

  render() {
    let { cartArr } = this.props;
    let ingredientsArr = cartArr.reduce((acc, cur) => {
      acc.push(...cur.ingredients)
      return acc;
    }, []);
    let ingAndQtyArr = ingredientsArr.reduce((acc, cur) => {
      let index = acc.findIndex(a => a?.ingName === cur.ingName);
      if (index >= 0) {
        acc[index].qty += cur.qty;
      } else {
        acc.push({ ...cur })
      }
      return acc;
    }, [])

    return (
      <div className="container">
        {
          cartArr.length > 0 ? (
            <>
              <div className="row">{this.showShoppingCart(cartArr)}</div>
              <div className="row">{this.showSummary(ingAndQtyArr)}</div>
            </>
          ) : (
            <div className="row">
              <h1 className='text-center fw-bold alert alert-warning mt-5' role='alert'>Cart Is Empty</h1>
            </div>
          )
        }

      </div>
    )
  }
}
