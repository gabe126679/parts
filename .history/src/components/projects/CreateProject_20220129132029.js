import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import ProgressBar from './ProgressBar';


class CreateProject extends Component {
  state = {
    title: '',
    category: '',
    price: '',
    content: '',
    file: null,
    error: null,
    types = ['image/png', 'image/jpeg'],
    photos: []
  } 

  

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  
  }

  

  handlePhotos = (e) => {
    let selected = e.target.files[0];

    if (this.state.selected && this.state.types.includes(this.state.selected.type)) {
      this.setState({
        file: selected,
        error: '' 
      });
    } else {
      this.setState({
        file: null,
        error: 'Please select an image file (png or jpg)'
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);

    this.props.history.push('/');
  } 
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <label htmlFor="title">Title</label>
          <div className="input-field">
            <input type="text" id="title" placeholder="title" onChange={this.handleChange}>
            </input>
          </div>
          <label htmlFor="category">Category</label>
          <div className="input-field">
            <input list="categories" placeholder="Category" id="category" onChange={this.handleChange}  />
              <datalist id="categories" >

                <option value="exhaust"></option>
                <option value="fuel and air"></option>
                <option value="engine parts and accessories"></option>
                <option value="lights and electrical"></option>
                <option value="brakes"></option>
                <option value="body"></option>
                <option value="tires and wheels"></option>
              </datalist>
          </div>
          <label htmlFor="price">Price</label>
          <div className="input-field">
            <input type="text" id="price" onChange={this.handleChange}></input>
          </div>
          <label htmlFor="content">Description</label>
          <div className="input-field">
            <textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
          </div>
          <label>
            <input type="file" onChange={this.handlePhotos} />
            <span>+</span>
          </label>
          <div className="output">
            { error && <div className="error">{ error }</div>}
            { file && <div>{ file.name }</div> }
            { file && <ProgressBar file={file} setFile={setFile} /> }
          </div>
          {/* <label htmlFor="images">Photos</label>
          <div className="input-field">
              <input onChange={this.handleChange} type="file" id="images" name="images" accept="image/*" />
          </div> */}
          <div className="input-field">
            <button className="btn pink lighten-1 ">
            Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
      createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
