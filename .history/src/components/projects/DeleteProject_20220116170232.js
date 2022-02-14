import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';

class DeleteProject extends Component {
  state = {
    title: '',
    content: ''
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.deleteProject(this.state);
    this.props.history.push('/');
  } 
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Are you sure you want to delete this project?</h5>
          <div className="input-field">
          <div className="button-array">
            <button className="btn pink lighten-1 ">
            Delete
            </button>
            <button className="btn blue lighten-1 ">
            Back
            <Redirect to="/" />
            </button>
          </div>
          </div>
        </form>
      </div>
    );
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
  )(DeleteProject)
