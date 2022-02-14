import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom';

const FuelAndAirList = ({projects}) => {
  
  return (
    <div className="project-list section">
      { projects && projects.map(project => {
        if (project.category === "fuel and air") {
          return (
            <Link to={'/project/' + project.id}>
              <ProjectSummary project={project} key={project.id} />
            </Link>
          );
        }
         
      })}           
    </div>
  );
}

export default FuelAndAirList;
