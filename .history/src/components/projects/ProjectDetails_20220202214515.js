import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteProject } from '../../store/actions/projectActions'
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

const headerStyle = {
  position: "relative",
  bottom: "55px",
  left: "5px",
  display: "inline-block",
  margin: "10px",
  float: "right",
};
const button2Style = {
  position: "relative",
  bottom: "50px",
  left: "5px",
  margin: "10px",
  float: "right",
  display: "inline"
};


const ProjectDetails = (props) => {

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


    if (project) {

      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title center">{project.title}</span>
              <p className="card-content center">{project.content}</p>
              <h5 className="card-content center">{project.price}</h5>
                  <br/>
                  <Link to={'/projectPurchase/' + props.match.params.id} className="btn purple lighten-1" >
                    purchase       
                  </Link>
            </div>
            <div className="card-image">
                <img src={project.photos[0]}/>
                <img src={project.photos[1]}/>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            <div >
              {(() => {
                if (auth.uid === project.authorId) {
                  return <button className="btn pink lighten-1" onClick={handleDelete} style={button2Style} >
                  Delete
                  </button> 
                } 
              })()}
                <br/>
                  <Link to={'/projectPurchase/' + props.match.params.id} className="btn purple lighten-1" >
                    purchase       
                  </Link>
                </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
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
    deleteProject: (project) => dispatch(deleteProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
  )(ProjectDetails)