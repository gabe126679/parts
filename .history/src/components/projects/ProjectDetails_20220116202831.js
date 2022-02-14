import React from 'react';
import { connect } from 'react-redux';
import DeleteProject from './DeleteProject';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

const buttonStyle = {
    position: "relative",
    top: "10px",
    left: "5px",
    margin: "10px",
};

const ProjectDetails = (props) => {
    const { project, auth } = props;
      if (!auth.uid) return <Redirect to='/signin'/>

    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
              <Link to={"/deleteProject/" + project.id} className=" btn pink lighten-1" style={buttonStyle} >
                Delete
                <DeleteProject project={project} key={project.id} />
              </Link>
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
    console.log(state.firestore.data.projects ? state.firestore.data.projects[ownProps.match.params.id] : null);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
      project: project,
      auth: state.firebase.auth
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
  )(ProjectDetails)