import React, { Component } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";



const listValidationSchema = Yup.object().shape({
  course: Yup.string().min(3, 'Course name must be at least 3 characters long').required('Course name is required'),
  students: Yup.array().min(3, 'At least 3 students are required').of(Yup.object().shape({
    name: Yup.string().required('Student name is required')
      .min(4, 'Student name must be at least 4 characters long'),
    quiz1: Yup.string().matches(/^[A-D]$/, 'Quiz 1 grade must be a letter A to D')
      .required('Quiz 1 grade is required'),
    quiz2: Yup.string().matches(/^[A-D]$/, 'Quiz 2 grade must be a letter A to D')
      .required('Quiz 2 grade is required'),
  })
  ),
})


export default class CourseForm extends Component {

  state = {
    quizArr1: ["A", "B", "C", "D"],
    quizArr2: ["A", "B", "C", "D"],
  }

  render() {
    const { lists } = this.props;
    let { quizArr1, quizArr2 } = this.state;
    const { index } = this.props.match.params;
    let list = index ? lists[+index] : {};
    let initialValues = { course: list.course || "", students: list.students || [] }

    return (
      <div className="container">
        <div className="row">
          <Formik initialValues={initialValues} validationSchema={listValidationSchema} onSubmit={(values) => {
            this.props.onSubmit(values, index)
            this.props.history.push("/")
          }}>
            {
              ({ values, errors }) => (
                <Form>
                  <h1 className="alert alert-danger fw-bold text-center" role="alert">
                    Details Of Course List
                  </h1>
                  <div className="form-floating mb-3">
                    <Field
                      name="course"
                      id="course"
                      type="text"
                      className="form-control"
                      placeholder="Course Name"
                    />
                    <label htmlFor="course" className="">Course Name</label>
                    <div className="text-danger"><ErrorMessage name="course" /></div>
                  </div>
                  <FieldArray
                    name="students"
                    render={({ push, remove }) => (
                      <div>
                        {values.students.map((name, index) => (
                          <div className="row mb-2" key={index}>
                            <div className="col-6">
                              <div class="form-floating mb-3">
                                <Field
                                  name={`students[${index}].name`}
                                  type="text"
                                  id="name"
                                  placeholder="Enter Product Name"
                                  className="form-control"
                                />
                                <label htmlFor="name">Student Name</label>
                              </div>
                            </div>
                            <div className="col-2">
                              <div class="form-floating mb-3">
                                <Field
                                  as="select"
                                  name={`students[${index}].quiz1`}
                                  id="quiz1"
                                  className="form-select">
                                  <option value="">Select Grade</option>
                                  {
                                    quizArr1.map(a => <option value={a}>{a}</option>)
                                  }
                                </Field>
                                <label htmlFor="quiz1">Quiz 1</label>
                              </div>
                            </div>
                            <div className="col-2">
                              <div class="form-floating mb-3">
                                <Field
                                  as="select"
                                  name={`students[${index}].quiz2`}
                                  id="quiz2"
                                  className="form-select">
                                  <option value="">Select Grade</option>
                                  {
                                    quizArr2.map(a => <option value={a}>{a}</option>)
                                  }
                                </Field>
                                <label htmlFor="quiz2">Quiz 2</label>
                              </div>
                            </div>
                            <div className="col-2 align-middle">
                              <button
                                type="button"
                                className="btn btn-warning btn-sm"
                                onClick={() => remove(index)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="text-danger">
                          {
                            typeof errors.students === 'string' ? errors.students : errors.students ? errors.students.reduce((acc, cur) => acc ? acc : cur ? cur.name || cur.quiz1 || cur.quiz2 : acc, "") : ""
                          }
                        </div>
                        <button
                          type="button"
                          className="btn btn-success btn-sm my-2"
                          onClick={() => push('')}>
                          Add To Course List
                        </button>
                      </div>
                    )}
                  />
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">
                      {index ? 'Update' : 'Add'}
                    </button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div >
    );
  }
}





// import React, { Component } from 'react';
// import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
// import * as Yup from "yup";



// const listValidationSchema = Yup.object().shape({
//   course: Yup.string().min(3, 'Course name must be at least 3 characters long').required('Course name is required'),
//   students: Yup.array().min(3, 'At least 3 students are required').of(Yup.object().shape({
//     name: Yup.string().required('Student name is required')
//       .min(4, 'Student name must be at least 4 characters long'),
//     quiz1: Yup.string().matches(/^[A-D]$/, 'Quiz 1 grade must be a letter A to D')
//       .required('Quiz 1 grade is required'),
//     quiz2: Yup.string().matches(/^[A-D]$/, 'Quiz 2 grade must be a letter A to D')
//       .required('Quiz 2 grade is required'),
//   })
//   ),
// })


// export default class CourseForm extends Component {

//   state = {
//     quizArr1: ["A", "B", "C", "D"],
//     quizArr2: ["A", "B", "C", "D"],
//   }

//   render() {
//     const { lists } = this.props;
//     let { quizArr1, quizArr2 } = this.state;
//     const { index } = this.props.match.params;
//     let list = index ? lists[+index] : {};
//     let initialValues = { course: list.course || "", students: list.students || [] }

//     return (
//       <div className="container">
//         <div className="row">
//           <Formik initialValues={initialValues} validationSchema={listValidationSchema} onSubmit={(values) => {
//             this.props.onSubmit(values, index)
//             this.props.history.push("/")
//           }}>
//             {
//               ({ values, errors }) => (
//                 <Form>
//                   <h1 className="alert alert-danger fw-bold text-center" role="alert">
//                     Details Of Course List
//                   </h1>
//                   <div className="form-floating mb-3">
//                     <Field
//                       name="course"
//                       id="course"
//                       type="text"
//                       className="form-control"
//                       placeholder="Course Name"
//                     />
//                     <label htmlFor="course" className="">Course Name</label>
//                     <div className="text-danger"><ErrorMessage name="course" /></div>
//                   </div>
//                   <FieldArray
//                     name="students"
//                     render={({ push, remove }) => (
//                       <div>
//                         {values.students.map((name, index) => (
//                           <div className="row mb-2" key={index}>
//                             <div className="col-6">
//                               <div class="form-floating mb-3">
//                                 <Field
//                                   name={`students[${index}].name`}
//                                   type="text"
//                                   id="name"
//                                   placeholder="Enter Product Name"
//                                   className="form-control"
//                                 />
//                                 <label htmlFor="name">Student Name</label>
//                               </div>
//                             </div>
//                             <div className="col-2">
//                               <div class="form-floating mb-3">
//                                 <Field
//                                   name={`students[${index}].quiz1`}
//                                   type="text"
//                                   placeholder="Quiz"
//                                   id="quiz1"
//                                   className="form-control"
//                                 />
//                                 <label htmlFor="quiz1" >Quiz 1</label>
//                               </div>
//                             </div>
//                             <div className="col-2">
//                               <div class="form-floating mb-3">
//                                 <Field
//                                   name={`students[${index}].quiz2`}
//                                   type="text"
//                                   placeholder="Quiz"
//                                   id="quiz2"
//                                   className="form-control"
//                                 />
//                                 <label htmlFor="quiz2" >Quiz 2</label>
//                               </div>

//                             </div>
//                             <div className="col-2 align-middle">
//                               <button
//                                 type="button"
//                                 className="btn btn-warning btn-sm"
//                                 onClick={() => remove(index)}
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           className="btn btn-success btn-sm my-2"
//                           onClick={() => push('')}>
//                           Add Name To Course List
//                         </button>
//                         <div className="text-danger">
//                           {
//                             typeof errors.students === 'string' ? errors.students : errors.students ? errors.students.reduce((acc, cur) => acc ? acc : cur ? cur.name || cur.quiz1 || cur.quiz2 : acc, "") : ""
//                           }
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <div className="form-group">
//                     <button type="submit" className="btn btn-primary btn-sm">
//                       Add
//                     </button>
//                   </div>
//                 </Form>
//               )
//             }
//           </Formik>
//         </div>
//       </div >
//     );
//   }
// }

