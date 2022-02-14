import React from 'react';
import moment from 'moment';


const ProjectSummary = ({project}) => {


  // const projectMap = project.comments.map((post) => {
  //   <p>{post.comment} {post.author}</p>
  // })
  
    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          {(() => {
            project.comments.map((post) => {
              return <p>{post.comment} {post.author}</p>
            })
          })()}
          <div className="card-image">
            <img src={project.photos}/>
          </div>
        </div>
      </div> 
    )
}

export default ProjectSummary