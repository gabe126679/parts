import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
// import Display from './Display';
import { projectFirestore } from '../../config/fbConfig'


class CreateProject extends Component {
  state = {
    title: "",
    category: "",
    price: "",
    content: "",
    photos: [],
    year: 2016,
    brand: "",
    shippingCost: "",
    tags: [],
    partNumber: "",
    upvoteCount: 0,
    votedOn: [],
    make: "",
    model: "",
    comments: [],
    selectedImg: null,
  } 

  // componentWillUnmount() {
    
  // }

  checkPictures = () => {

    this.props.history.push('/create');
  }

  handleChange = async (e) => {
    if (e.target.id === "price" && this.state.price === "") {
      this.setState({
        price: "$" + e.target.value 
      });
     } else if (e.target.id === "shippingCost" && this.state.shippingCost === "") {
      this.setState({
        shippingCost: "$" + e.target.value 
      });   
    } else if ((e.target.id === "price") && (!this.state.price === "")) {
      this.setState({
        price: e.target.value + ".00"
      });     
    } else if ((e.target.id === "shippingCost") && (!this.state.shippingCost === "")) {
      this.setState({
        shippingCost: e.target.value + ".00"
      });     
    } else if (!e.target.id === ("price" || "shippingCost" || "content")) {
      this.setState({
        tags: [...this.state.tags, e.target.value]
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value,
      });
    }

  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let newTags = [
      this.state.title,
      this.state.category,
      this.state.brand,
      this.state.make,
      this.state.model,
      this.state.year,
      this.state.partNumber,
      this.state.title,
    ];
    
    newTags.map((tag) => {
      if (this.state.tags.includes(tag)) {
        newTags.remove(tag);
      }
        this.setState({
          tags: newTags
        });
    })


    const response = projectFirestore.collection('images');
    const data = await response.get()
    data.docs.forEach(doc => {
      this.setState({
        photos: [...this.state.photos, doc.data().url]
      })
      console.log("hello")
    });


    this.props.createProject(this.state)

    data.docs.forEach(doc => {
      doc.ref.delete();
    });

    this.props.history.push('/');
  }

  handleNoise = (e) => {
    e.preventDefault();
    console.log(this.state.tags)
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
            <input type="text" id="title"  onChange={this.handleChange}>
            </input>
          </div>
          <label htmlFor="brand">Brand (optional)</label>
          <div className="input-field">
            <input type="text" id="brand"  onChange={this.handleChange}>
            </input>
          </div>
          <label htmlFor="year">Year (optional)</label>
          <div className="input-field">
            <input type="number" min="1900" max="2099" step={1} value={this.state.year} id="year"  onChange={this.handleChange} />
          </div>
          <label htmlFor="make">Make (optional)</label>
          <div className="input-field">
            <input type="text" id="make"  onChange={this.handleChange}>
            </input>
          </div>
          <label htmlFor="model">Model (optional)</label>
          <div className="input-field">
            <input type="text" id="model"  onChange={this.handleChange}>
            </input>
          </div>
          <label htmlFor="category">Category</label>
          <div className="input-field">
            <input list="categories"  id="category" onChange={this.handleChange}  />
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
              <input type="text" textContent="$" placeholder="$" id="price" value={this.state.price} onChange={this.handleChange} />
          </div>
          <label htmlFor="shippingCost">Shipping Cost</label>
          <div className="input-field">
              <input type="text" textContent="$" placeholder="$" id="shippingCost" onChange={this.handleChange} value={this.state.shippingCost} />
          </div>
          <label htmlFor="content">Description</label>
          <div className="input-field">
            <textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <div >
              <UploadForm />
                <ImageGrid  setSelectedImg={() => this.setState().bind(this)}/>
                { this.state.selectedImg && (
                  <Modal selectedImg={this.state.selectedImg} setSelectedImg={() => this.setState().bind(this)} />
                )}
                { this.state.selectedImg }
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 ">
            Create
            </button>

          </div>
        </form>
        <button onClick={this.handleNoise}>
            bsnt
            </button>
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
