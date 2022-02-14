import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
// import Modal from './Modal';
// import Display from './Display';
import { projectFirestore } from '../../config/fbConfig'


class CreateProject extends Component {
  state = {
    title: '',
    category: '',
    price: '',
    content: '',
    photos: []
  } 

  checkPictures = () => {

    this.props.history.push('/create');
  }

  handleChange = async (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    const response = projectFirestore.collection('images');
    const data = await response.get()
    data.docs.forEach(doc => {
      // this.setState({
      //   photos: [...this.state.photos, doc]
      // })
      console.log(doc.data());
    });
    console.log(this.state.photos);
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    this.props.createProject(this.state);

    this.props.history.push('/');
  } 
  render() {
    const { auth } = this.props;
    

    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className="container">
        <button onClick={this.checkPictures} >
          Check
        </button>
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
          <div className="input-field">
            <div >
              <UploadForm />
                <ImageGrid  />
            </div>
          </div>
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

const mapStateToProps = (state, props) => {

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
