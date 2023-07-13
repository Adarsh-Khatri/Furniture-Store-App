import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from "yup";
import { getApi, postApi, putApi } from '../services/httpServices';


const validateForm = Yup.object().shape({
  prodCode: Yup.string().required('Product Code is required'),
  category: Yup.string().required('Category is required'),
  img: Yup.string().url('Invalid URL').required('Image URL is required'),
  title: Yup.string().required('Product Name is required'),
  desc: Yup.array().of(Yup.string().required('Description is required')).required('At least one Description is required'),
  ingredients: Yup.array().of(
    Yup.object().shape({
      ingName: Yup.string().required('Item Name is required'),
      qty: Yup.number().typeError('Quantity must be a number').required('Quantity is required').min(1, "Cannot Be Less Than 1")
    })
  ).required('At least one Ingredient is required')
})

export default class AddProduct extends Component {
  state = {
    form: { prodCode: "", category: "", desc: [], img: "", ingredients: [], title: "" },
    categoryArr: ['Dining', "Drawing", "Bedroom", "Study"]
  }

  fetchData = async () => {
    let products = await getApi('/products');
    let { prodCode } = this.props.match.params;
    let form = prodCode ? products.find(p => p.prodCode === prodCode) : { prodCode: "", category: "", desc: [], img: "", ingredients: [], title: "" };
    this.setState({ form })
  }

  componentDidMount() {
    this.fetchData()
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props)
      this.fetchData()
  }



  postData = async (url, obj) => {
    try {
      await postApi(url, obj);
      this.props.history.push(`/products/${obj.category}/${obj.prodCode}`)
    } catch (error) {
      console.log("Error ", error);
    }
  }

  updateData = async (url, obj) => {
    try {
      await putApi(url, obj);
      this.props.history.push(`/products/${obj.category}/${obj.prodCode}`)
    } catch (error) {
      console.log("Error ", error);
    }
  }

  handleSubmit = (values) => {
    let { prodCode } = this.props.match.params;
    prodCode ? this.updateData(`/products/edit/${prodCode}`, values) : this.postData('/products', values)
  }

  showImage = (img) => {
    return (
      <div className='row'>
        {
          img && (
            <div className='new-product-container'>
              <img src={img} alt="furniture" className='new-product-image alert alert-secondary rounded rounded-5' />
            </div>
          )
        }
      </div>
    )
  }

  render() {
    let { prodCode } = this.props.match.params;
    const { form, categoryArr } = this.state;
    let initialValues = { prodCode: form.prodCode || "", category: form.category || "", desc: form.desc || [], img: form.img || "", ingredients: form.ingredients || [], title: form.title || "" }

    return (
      <div className="container">
        <div className="row my-5">
          <Formik initialValues={{ ...initialValues }} validationSchema={validateForm} onSubmit={(values) => this.handleSubmit(values)} enableReinitialize>
            {
              ({ values, errors }) => {
                return (
                  <>
                    <h1 className="alert alert-info fw-bold text-center mb-5" role="alert">{prodCode ? 'Update Product' : 'Add New Product'}
                    </h1>
                    <div className="col-md-7">
                      <Form>
                        <div className="form-floating mb-3">
                          <Field name="prodCode" id="prodCode" type="text" className="form-control" placeholder="Product Code" />
                          <label htmlFor="prodCode" className="">Product Code</label>
                          <div className="text-danger"><ErrorMessage name="prodCode" /></div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field name="title" id="title" type="text" className="form-control" placeholder="Product Name" />
                          <label htmlFor="title" className="">Product Name</label>
                          <div className="text-danger"><ErrorMessage name="title" /></div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field name="img" id="img" type="text" className="form-control" placeholder="Image URL" />
                          <label htmlFor="img" className="">Image URL</label>
                          <div className="text-danger"><ErrorMessage name="img" /></div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field as="select" name="category" id="category" className="form-select" >
                            <option value="">Select Category</option>
                            {categoryArr.map(a => <option key={a} value={a}>{a}</option>)}
                          </Field>
                          <label htmlFor="category">Select Category</label>
                          <div className="text-danger"><ErrorMessage name="category" /></div>
                        </div>



                        {/* ---------------------------------------------------FIELDARRAY FOR DESCRIPTION */}



                        <FieldArray name="desc" render={(fieldArrayProps) => {
                          let { push, remove, form } = fieldArrayProps;
                          let { values } = form;
                          let { desc } = values;
                          return (
                            <div>
                              <button type="button" className="btn btn-success my-2" onClick={() => push('')} >
                                Add Description
                              </button>
                              {
                                desc.map((d, index) => (
                                  <div className="row mb-2" key={index}>
                                    <div className="col-11">
                                      <div className="form-floating mb-3">
                                        <Field name={`desc.${index}`} type="text" id={`desc-${index}`} placeholder="Enter Description" className="form-control" />
                                        <label htmlFor={`desc-${index}`}>Add Description</label>
                                        <div className="text-danger"><ErrorMessage name={`desc.${index}`} /></div>
                                      </div>
                                    </div>
                                    <div className="col-1">
                                      <div className='pt-2'>
                                        <button type="button" className="btn btn-danger" onClick={() => remove(index)} >
                                          X
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              {/* <div className="text-danger"><ErrorMessage name="desc" /></div> */}
                            </div>
                          )
                        }}
                        />



                        {/* ---------------------------------------------------FIELDARRAY FOR INGREDIENTS */}



                        <FieldArray name="ingredients" render={(fieldArrayProps) => {
                          let { push, remove, form } = fieldArrayProps;
                          let { values } = form;
                          let { ingredients } = values;
                          return (
                            <div>
                              <button type="button" className="btn btn-success my-2" onClick={() => push({ ingName: "", qty: "" })} >
                                Add Item Shipped With Product
                              </button>
                              {ingredients.map((ing, index) => (
                                <div className="row mb-2" key={index}>
                                  <div className="col-7">
                                    <div className="form-floating mb-3">
                                      <Field name={`ingredients.${index}.ingName`} type="text" id={`ingName-${index}`} placeholder="Enter Ingredient Name" className="form-control" />
                                      <label htmlFor={`ingName-${index}`}>Item Name</label>
                                    </div>
                                    <div className="text-danger"><ErrorMessage name={`ingredients.${index}.ingName`} /></div>
                                  </div>
                                  <div className="col-4">
                                    <div className="form-floating mb-3">
                                      <Field name={`ingredients.${index}.qty`} type="number" id={`qty-${index}`} placeholder="Enter Quantity" className="form-control" />
                                      <label htmlFor={`qty-${index}`}>Quantity</label>
                                    </div>
                                    <div className="text-danger"><ErrorMessage name={`ingredients.${index}.qty`} /></div>
                                  </div>
                                  <div className="col-1">
                                    <div className='pt-2'>
                                      <button type="button" className="btn btn-danger" onClick={() => remove(index)} >
                                        X
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                        />
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary"> {prodCode ? "Update Product" : "Add Product"} </button>
                        </div>
                      </Form>
                    </div>
                    <div className="col-md-5">{this.showImage(values.img)}</div>
                  </>
                )
              }}
          </Formik>
        </div>
      </div>
    );
  }
}
