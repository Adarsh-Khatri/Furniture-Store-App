import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { postApi } from '../services/httpServices';
import { storeUser } from '../services/authServices';


const validateForm = Yup.object().shape({
    username: Yup.string().required("Email is required").email("Email Not Valid"),
    password: Yup.string().required("Password is required").min(6, "Password should have atleast 6 characters")
})

export default class Login extends Component {

    state = {
        form: { username: '', password: '' }
    }

    handleChange = ({ target }) => {
        let { name, value } = target;
        this.handleValidate(target);
        this.setState((prevState) => ({ form: { ...prevState.form, [name]: value } }));
    };

    async login(url, obj) {
        try {
            let user = await postApi(url, obj);
            storeUser(user)
            this.props.history.push('/');
        } catch (err) {
            alert(err.response.data);
        }
    }

    handleSubmit = (values) => {
        // e.preventDefault();
        console.log('submitting');
        this.login("/login", values)
    }

    render() {
        let { form } = this.state;
        return (
            <div className="container">
                <h1 className='fw-bold text-center my-5'>LOGIN</h1>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className='col-sm-6 bg-light rounded rounded-5 p-5'>
                        <Formik initialValues={form} validationSchema={validateForm} onSubmit={(values) => this.handleSubmit(values)}>
                            {
                                ({ values }) => (
                                    <Form>
                                        <div className="form-floating mb-3">
                                            <Field
                                                name="username"
                                                id="username"
                                                type="text"
                                                className="form-control px-5"
                                                placeholder="username"
                                            />
                                            <label htmlFor="username" className="px-5">Email</label>
                                            <div className="text-danger"><ErrorMessage name="username" /></div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <Field
                                                name="password"
                                                id="password"
                                                type="text"
                                                className="form-control px-5"
                                                placeholder="password"
                                            />
                                            <label htmlFor="password" className="px-5">Password</label>
                                            <div className="text-danger"><ErrorMessage name="password" /></div>
                                        </div>
                                        <div className='mt-3 text-center'>
                                            <button type='submit' className='btn btn-primary my-3'>Login</button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}










// import React, { Component } from 'react';
// import { Formik, Field, Form } from 'formik';
// import { postApi } from '../services/httpServices';
// import { storeUser } from '../services/authServices';


// export default class Login extends Component {

//     state = {
//         form: { username: '', password: '' }
//     }

//     handleChange = ({ target }) => {
//         let { name, value } = target;
//         this.handleValidate(target);
//         this.setState((prevState) => ({ form: { ...prevState.form, [name]: value } }));
//     };

//     // async login(url, obj) {
//     //     try {
//     //         let user = await postApi(url, obj);
//     //         storeUser(user)
//     //         this.props.history.push('/products');
//     //     } catch (err) {
//     //         if (err.response && err.response.status === 401) {
//     //             alert(err.response.data)
//     //         }
//     //     }
//     // }


//     // handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     let { form } = this.state;
//     //     let errors = this.validateAll();
//     //     if (this.isValid(errors)) {
//     //         this.login("/login", form)
//     //     } else {
//     //         this.setState({ errors: errors })
//     //     }
//     // }

//     makeInputField = (name, label, value, placeH, errors) => {
//         return (
//             <>
//                 <label htmlFor={name} className="form-label lead fw-bold">
//                     {label}<sup className='text-danger'>*</sup>
//                 </label>
//                 <div className="">
//                     <input
//                         type="text"
//                         className="form-control"
//                         id={name}
//                         name={name}
//                         placeholder={`${placeH}`}
//                         value={value}
//                         onChange={this.handleChange}
//                         required
//                     />
//                     {errors[name] && (
//                         <div className="text-center alert alert-danger alert-sm fs-6 fw-bold" role="alert">{errors[name]}</div>
//                     )}
//                 </div>
//             </>
//         )
//     }

//     render() {
//         let { username, password } = this.state.form;
//         let { errors = null } = this.state;
//         return (
//             <div className="container">
//                 <h1 className='fw-bold text-center my-2'>LOGIN</h1>
//                 <div className="row">
//                     <div className="col-sm-3"></div>
//                     <div className='col-sm-6 bg-light rounded rounded-5 p-5'>
//                         {errors.status && <div className="fw-bold text-danger text-center">{errors.status}</div>}
//                         <div className="form-group my-3">
//                             {this.makeInputField('username', 'Username', username, 'Enter Your Username', errors)}
//                         </div>
//                         <div className="form-group">
//                             {this.makeInputField('password', 'Password', password, 'Enter Your Password', errors)}
//                         </div>
//                         <div className='mt-3 text-center'>
//                             <button type='button' className='btn btn-primary my-3' disabled={!this.isFormValid()} onClick={(e) => this.handleSubmit(e)}>Login</button>
//                         </div>
//                     </div>
//                     <div className="col-sm-3"></div>
//                 </div>
//             </div>
//         )
//     }
// }

