import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteProject } from '../../store/actions/projectActions'
import { updateProject } from '../../store/actions/projectActions'
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import StripeContainer from "./StripeContainer"
import Footer from "../layout/Footer"

const stripeKey = "pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS";

const button2Style = {
  position: "relative",
  bottom: "12px",
  left: "5px",
  margin: "10px",
  float: "right",
  display: "inline"
};


const ProjectDetails = (props) => {
    const [display, setDisplay] = useState("")
    const { project, auth } = props;
    
    const handleDelete = (e) => {
      e.preventDefault();
      if (auth.uid === project.authorId) {
        props.deleteProject(props.match.params.id)
      } else {
        props.history.push('/');
      };
      props.history.push('/');
    }
    const handleSubmit = (e) => {
      e.preventDefault(); 
      props.updateProject(display, props.match.params.id)
      console.log(e);
    }
    const handleChange = (e) => {
      e.preventDefault();
      setDisplay(e.target.value);
      console.log(props);
    }
    async function handleToken(token, addresses) {
      // let product = {
      //   name: project.title,
      //   price: project.price
      // }
      // const response = await axios.post("/projectCheckout", {
      //   token,
      //   product
      // });

      // const { status } = response.data;
      // if (status === "success") {
      //   console.log("succes");
      // } else {

      // }

      console.log({ token, addresses });
    }
    

    if (project) {
      
      return (
        <div>
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="title-span">{project.title}</span>
              <br/>
              <p className="grey-text left">brand:</p>
              <br/>
              <p className="">&emsp;{project.brand}</p>
              <p className="grey-text left">make:</p>
              <br/>
              <p className="">&emsp;{project.make}</p>
              <p className=" grey-text left">model:</p>
              <br/>
              <p className="">&emsp;{project.model}</p>
              <p className=" grey-text left">year:</p>
              <br/>
              <p className="">&emsp;{project.year}</p>
              <p className=" grey-text left">part number:</p>
              <p className="">&emsp;{project.partNumber}</p>

              <p className=" grey-text center">description:</p>
              <p className=" left">{project.content}</p>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <p className=" grey-text center">price:</p>
              <h5 className="left">{project.price}
              </h5>
            </div>
            <br/>
            <div className="card-image">
                <img src={project.photos[0]}/>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div >
              <br/>
              {(() => {
                if (auth.uid === project.authorId) {
                  return <div>
                    <button className="btn btn-three" onClick={handleDelete} style={button2Style} >
                    Delete
                    </button>
                    <Link className="btn btn-three" style={button2Style} to={'/editProject/' + props.match.params.id}>
                      Edit
                    </Link>
                  </div> 
                } 
                })()}
                  <StripeCheckout
                  stripeKey={stripeKey}
                  token={handleToken}
                  billingAddress
                  shippingAddress
                  amount={project.price * 100}
                  name={project.title}
                  
                  />

              </div>
            </div>
            <br/>
          </div>
          <div className="comment-section white">
            <br/>
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                <div>{moment(project.createdAt.toDate()).calendar()}</div>
                <br/>
                <div className="scrollContainer grey" > 
                {project.comments.map((post) => {
                  if (project.comments) {
                    return <div>
                      <div className="black-text">{post.authorFirst} {post.authorLast}
                      </div> 
                      <div className="blue center white-text">{post.comment}
                      </div> 
                      <div className="right-align">{moment(post.createdAt.toDate()).calendar()}
                    </div> 
                    <br/>

                    </div>
                  }

                  })
                }
                </div>

              
                <form onSubmit={handleSubmit}>
                  <div>
                    <textarea onChange={handleChange} placeholder="leave a comment" name="comments" id="comments" >
                    </textarea>
                  </div>
                  <button type="submit" value="Submit" className="btn">submit comment</button>
                </form>
              </div>
        </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
      </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading projects...</p>
        </div>
      )
    }
  }

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
      project: project,
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: (project) => dispatch(deleteProject(project)),
    updateProject: (comment, project) => dispatch(updateProject(comment, project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
  )(ProjectDetails)