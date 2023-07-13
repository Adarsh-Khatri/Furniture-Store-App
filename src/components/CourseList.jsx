import React, { Component } from 'react'

export default class CourseList extends Component {

  editList = (index) => {
    this.props.history.push(`/courselist/${index}/edit`)
  }

  addList = () => {
    this.props.history.push('/courselist/add')
  }

  render() {
    let { lists } = this.props;
    return (
      <div className="container">
        <div className="row">
          <h1 className='alert alert-info fw-bold text-center' role='alert'>Course List</h1>
        </div>
        {
          lists.map((l1, index) =>
            <div className="row lead fw-bold" key={index}>
              <div className="col-sm-2 border">{l1.course}</div>
              <div className="col-sm-8 border">{
                l1.students.map(x => `${x.name} - ${x.quiz1} - ${x.quiz2}`).join(', ')
              }</div>
              <div className="col-sm-2 border">
                <button className='btn btn-warning btn-sm' onClick={() => this.editList(index)}>Edit</button>
              </div>
            </div>
          )
        }
        <div className="row">
          <div>
            <button className='btn btn-primary btn-sm my-3' onClick={() => this.addList()}>Add New Course List</button>
          </div>
        </div>
      </div>
    )
  }
}
