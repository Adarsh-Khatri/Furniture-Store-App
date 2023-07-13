import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    const IMG_NOT_FOUND = "https://mllj2j8xvfl0.i.optimole.com/cb:jC7e.37109/w:1024/h:726/q:90/f:avif/https://themeisle.com/blog/wp-content/uploads/2022/06/sorry-you-are-not-allowed-to-access-this-page-error.png";
    return (
      <div className="container">
        <div className="row">
          <div className='not-found-parent'>
          <img src={IMG_NOT_FOUND} alt="not found" className='not-found-image' />
          </div>
        </div>
      </div>
    )
  }
}
