import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ProjectSummary = ({project}) => {

    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
            <p className="right-align">{project.upvoteCount} <FontAwesomeIcon style={{color: "grey"}} icon={faArrowUp} /> </p>
          <div className="card-image">
            <img src={project.photos}/>
          </div>
        </div>
      </div> 
    )
}

export default ProjectSummary;