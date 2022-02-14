import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const ProjectDetails = (props) => {
    const { id } = useParams();
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Project Title - { id }</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing el</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
              <div>Posted by the Net Ninja</div>
              <div>9/2/22 2:00am</div>
          </div>
        </div>
      </div>
    );
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
  )(ProjectDetails)