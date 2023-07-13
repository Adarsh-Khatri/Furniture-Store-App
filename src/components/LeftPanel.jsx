import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
export default class LeftPanel extends Component {

  state = {
    categoryArr: ["Dining", "Drawing", "Bedroom", "Study"]
  }

  handleCategory = (e, handleChange) => {
    this.props.onCategory(e.currentTarget.value)
    handleChange(e.currentTarget.value)
  }

  render() {
    let { categoryArr } = this.state;
    let { category } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Formik initialValues={{ category: category || "" }}>
            {(values) => (
              <Form>
                <div className="form-group my-5">
                  <label htmlFor="category" className='fw-bold fs-3 rounded text-center alert alert-info w-100 py-3 m-0' role='alert'>Category</label>
                  {
                    categoryArr.map(c =>
                      <div className="form-check rounded m-0 py-2 ps-5 alert alert-danger">
                        <Field className="form-check-input" id={c} type="radio" name="category" checked={c === category} value={c} onChange={(e) => this.handleCategory(e, values.handleChange)} />
                        <label className='form-check-label' htmlFor={c}>{c}</label>
                      </div>
                    )
                  }
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div >
    )
  }
}
