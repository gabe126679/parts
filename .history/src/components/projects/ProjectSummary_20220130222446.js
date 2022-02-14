import React from 'react';
import moment from 'moment';


const ProjectSummary = ({project}) => {

    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          <img src={project.photos[0]}></img>
        </div>
      </div> 
    )
}

export default ProjectSummary