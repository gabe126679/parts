import React from 'react';
import moment from 'moment';
import DeleteProject from './DeleteProject'
import { Link } from 'react-router-dom';

const ProjectSummary = ({project}) => {
    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}Project Title</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
        </div>
        <button>
          <Link to={'/deletProject/' + project.id}>
            <DeleteProject project={project} key={project.id} />
          </Link>
          delete
        </button>
      </div> 
    )
}

export default ProjectSummary