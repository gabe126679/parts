import React from 'react'

const ProjectSummary = ({project}) => {
    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}Project Title</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">9/3/21 2:00am</p>
        </div>
      </div> 
    )
}

export default ProjectSummary