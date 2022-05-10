import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import { projectFirestore } from '../../config/fbConfig'

import "../styles.css";


const CreateFunction = (props) => {

    const { auth } = props;

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [photos, setPhotos] = useState([]);
    const [year, setYear] = useState(2016);
    const [brand, setBrand] = useState("");
    const [shippingCost, setShippingCost] = useState("");
    const [tags, setTags] = useState([]);
    const [partNumber, setPartNumber] = useState("");
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [votedOn, setVotedOn] = useState([]);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    const handleChange = async (e) => {
        if (!e.target.id === ("price" || "shippingCost" || "content")) {
        setTags(tags => [...tags, e.target.value])
        } else if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "brand") {
            setBrand(e.target.value);
        } else if (e.target.id === "make") {
            setMake(e.target.value);
        } else if (e.target.id === "model") {
            setModel(e.target.value);
        } else if (e.target.id === "category") {
            setCategory(e.target.value);
        } else if (e.target.id === "content") {
            setContent(e.target.value);
        } else if (e.target.id === "year") {
            setYear(e.target.value);
        } else if (e.target.id === "partNumber") {
            setPartNumber(e.target.value);
        } else if (e.target.id === "price") {
          setPrice(e.target.value);
        } else if (e.target.id === "shippingCost") {
          setShippingCost(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newTags = [
          title,
          category,
          brand,
          make,
          model,
          year,
          partNumber,
          title,
        ];
        
        newTags.map((tag) => {
        if (tags.includes(tag)) {
          newTags.remove(tag);
        }
          setTags(newTags);
        })


        const response = projectFirestore.collection('images');
        const data = await response.get()
        data.docs.forEach(doc => {
          console.log(doc.data().url);
          photos.push(doc.data().url);
        });



        const stateObject = {
            title,
            category,
            price,
            content,
            photos,
            brand,
            make,
            model,
            year,
            shippingCost,
            tags,
            partNumber,
            upvoteCount,
            votedOn,
            comments, 
            selectedImg
        }
        
        console.log(photos);

        props.createProject(stateObject);

        data.docs.forEach(doc => {
          doc.ref.delete();
        });

        props.history.push('/');
    }
    
    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className="container">
        <br/>
        <br/>
        <br/>
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Product</h5>

          <label htmlFor="title">Title</label>
          <div className="input-field">
            <input type="text" id="title"  onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="brand">Brand (optional)</label>
          <div className="input-field">
            <input type="text" id="brand"  onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="year">Year (optional)</label>
          <div className="input-field">
            <input type="number" min="1900" max="2099" step={1} value={year} id="year"  onChange={handleChange} />
          </div>
          <label htmlFor="make">Make (optional)</label>
          <div className="input-field">
            <input type="text" id="make"  onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="model">Model (optional)</label>
          <div className="input-field">
            <input type="text" id="model"  onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="category">Category</label>
          <div className="input-field">
            <input list="categories"  id="category" onChange={handleChange}  />
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
          <label htmlFor="partNumber">Part Number</label>
          <div className="input-field">
              <input type="text" id="partNumber" value={partNumber} onChange={handleChange} />
          </div>
          <label htmlFor="price">Price</label>
          <div className="input-field">
              <input type="text" placeholder="$" id="price" value={price} onChange={handleChange} />
          </div>
          <label htmlFor="shippingCost">Shipping Cost</label>
          <div className="input-field">
              <input type="text" placeholder="$" id="shippingCost" onChange={handleChange} value={shippingCost} />
          </div>
          <label htmlFor="content">Description</label>
          <div className="input-field">
            <textarea className="materialize-textarea" id="content" onChange={handleChange}></textarea>
          </div>
          <div className="input-field">
            <div  >
              <UploadForm />
              <ImageGrid setSelectedImg={setSelectedImg} />
              { selectedImg }
            </div>
          </div>

          <div className="input-field">
            <button type="submit" className="btn btn-three">
            Create
            </button>
          </div>
        </form>
        <br/>
      </div>
    );
  
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateFunction);
