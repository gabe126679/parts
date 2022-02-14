import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteProject } from '../../store/actions/projectActions'
import { updateProject } from '../../store/actions/projectActions'
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();


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
    
    if (!auth.uid) return <Redirect to='/signin'/>
    
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



    async function handleToken(token) {
      let product = {
        name: project.title,
        price: project.price
      }
      const response = await axios.post("/projectCheckout", {
        token,
        product
      });

      const { status } = response.data;
      if (status === "success") {
        toast("Success! Check Email for Details")
      } else {
        toast("error occurred", { type:
        "error" });
      }
    }
    

    if (project) {
      
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title center">{project.title}</span>
              <p className="card-content center">{project.content}</p>
              <h5 className="card-content center">{project.price}</h5>
                  <br/>
            </div>
            <br/>
            <div className="card-image">
                <img src={project.photos[0]}/>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
              <br/>

                      {project.comments.map((post) => {
                        if (project.comments) {
                          return <div className="scrollContainer" > <div > 
                          <div>{post.author}
                          </div> <div className="yellow center">{post.comment}
                          </div> 
                          <div className="right-align">{moment(post.createdAt.toDate()).calendar()}
                          </div> 
                          <br/>
                        </div>
                        </div>
                        }

                      })
                    }

                
                  <form onSubmit={handleSubmit}>
                    <div>
                      <textarea onChange={handleChange} placeholder="leave a comment" name="comments" id="comments" >
                      </textarea>
                    </div>
                    <input type="submit" value="Submit"/>
                  </form>
              
            <div >
                <br/>
                {(() => {
                  if (auth.uid === project.authorId) {
                    return <div>
                      <button className="btn pink lighten-1" onClick={handleDelete} style={button2Style} >
                      Delete
                      </button>
                      <Link className="btn pink lighten-1" style={button2Style} to={'/editProject/' + props.match.params.id}>
                        Edit
                      </Link>
                    </div> 
 
                    
                  } 
                  })()}
                  <StripeCheckout
                  stripeKey="pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS"
                  token={handleToken}
                  billingAddress
                  shippingAddress
                  amount={project.price * 100}
                  name={project.title}
                  />
                </div>
            </div>
          </div>
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