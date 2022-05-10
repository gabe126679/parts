import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import { projectFirestore } from '../../config/fbConfig'


const EditFunction = (props) => {

  const { auth } = props;

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
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

  useEffect(async () => {
    const response = projectFirestore.collection('projects');
    const data = await response.get();
    data.docs.forEach(doc => {
        if (doc.id === props.match.params.id) {
            setTitle( doc.data().title);
            setCategory( doc.data().category);
            setPrice( doc.data().price);
            setContent( doc.data().content);
            setPhotos( doc.data().photos);
            setYear( doc.data().year);
            setBrand( doc.data().brand);
            setShippingCost( doc.data().shippingCost);
            setTags( doc.data().tags);
            setPartNumber( doc.data().partNumber);
            setUpvoteCount( doc.data().upvoteCount);
            setVotedOn( doc.data().votedOn);
            setMake( doc.data().make);
            setModel( doc.data().model);
            setComments( doc.data().comments);
            setId( props.match.params.id);            
        }
    });
  }, []);

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
      setPhotos(photos => [...photos, doc.data().url])
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
      
      props.editProject(stateObject);

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
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Update Project</h5>

          <label htmlFor="title">Title</label>
          <div className="input-field">
            <input type="text" id="title" placeholder={title} onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="brand">Brand (optional)</label>
          <div className="input-field">
            <input type="text" id="brand" placeholder={brand} onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="year">Year (optional)</label>
          <div className="input-field">
            <input type="number" min="1900" max="2099" step={1} value={year} placeholder={year} id="year"  onChange={handleChange} />
          </div>
          <label htmlFor="make">Make (optional)</label>
          <div className="input-field">
            <input type="text" id="make" placeholder={make} onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="model">Model (optional)</label>
          <div className="input-field">
            <input type="text" id="model" placeholder={model} onChange={handleChange}>
            </input>
          </div>
          <label htmlFor="category">Category</label>
          <div className="input-field">
            <input list="categories" placeholder={category} id="category" onChange={handleChange}  />
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
              <input type="text" textContent="$" placeholder={price} id="price" value={price} onChange={handleChange} />
          </div>
          <label htmlFor="shippingCost">Shipping Cost</label>
          <div className="input-field">
              <input type="text" textContent="$" placeholder={shippingCost} id="shippingCost" onChange={handleChange} value={shippingCost} />
          </div>
          <label htmlFor="content">Description</label>
          <div className="input-field">
            <textarea className="materialize-textarea" id="content" placeholder={content} onChange={handleChange}></textarea>
          </div>
          <div className="input-field">
            <div >
              <UploadForm />
                <ImageGrid photos={photos} />
                
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 ">
            Update
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
      editProject: (project) => dispatch(editProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFunction);
