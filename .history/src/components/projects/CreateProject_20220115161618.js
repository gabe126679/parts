import React, { Component } from 'react';

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  } 
  hangleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  } 
  hangleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  } 
  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.hangleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.hangleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea className="materialize-textarea" id="content" onChange={this.hangleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
            Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProject;
