import React from 'react';
import moment from 'moment';


const ProjectSummary = ({project}) => {

    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          <img className="card-img"src={project.photos}></img>
        </div>
      </div> 
    )
}

export default ProjectSummary