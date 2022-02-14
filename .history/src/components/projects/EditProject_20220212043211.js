import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
// import Modal from './Modal';
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
  } 

  async componentDidMount() {
    const response = projectFirestore.collection('projects');
    const data = await response.get()
    data.docs.forEach(doc => {
        if (doc.id === this.props.match.params.id) {
            this.setState({
                title: doc.data().title,
                category: doc.data().category,
                price: doc.data().price,
                content: doc.data().content,
                photos: doc.data().photos,
                year: doc.data().year,
                brand: doc.data().brand,
                shippingCost: doc.data().shippingCost,
                tags: doc.data().tags,
                partNumber: doc.data().partNumber,
                upvoteCount: doc.data().upvoteCount,
                votedOn: doc.data().votedOn,
                make: doc.data().make,
                model: doc.data().model,
                comments: doc.data().comments,
              })
        }
    })
  }

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
    });

    this.props.editProject(this.state)

    data.docs.forEach(doc => {
      doc.ref.delete();
    });

    this.props.history.push('/');
  }

  handleNoise = async (e) => {
    e.preventDefault();
    console.log(this.state);
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
            <input type="text" id="title" placeholder={this.state.title} onChange={this.handleChange}>
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
                <ImageGrid photos={this.state.photos} />
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

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
      editProject: (project) => dispatch(editProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
