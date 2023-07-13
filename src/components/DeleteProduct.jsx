import React, { Component } from 'react'
import { deleteApi } from '../services/httpServices'

export default class DeleteProduct extends Component {

  deleteProduct = async () => {
    try {

      let { code, category } = this.props.match.params;
      await deleteApi(`/product/delete/${code}`);
      this.props.history.push(`/products/${category}`)
    } catch (error) {
      console.log('Error:', error);
    }
  }

  componentDidMount() {
    this.deleteProduct()
  }

  render() {
    return ("")
  }
}
