import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteProject } from '../../store/actions/projectActions'
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
    console.log(props.project);
      if (!auth.uid) return <Redirect to='/signin'/>
    const handleDelete = (e) => {
      e.preventDefault();
      props.project.deleteProject();
      props.history.push('/');
    }
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
              <button className="btn pink lighten-1" onClick={handleDelete} style={buttonStyle} >
                Delete
              </button>
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