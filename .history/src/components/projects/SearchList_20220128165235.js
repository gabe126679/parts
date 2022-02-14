import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom';
import { tags } from '../dashboard/Dashboard'

const SearchList = ({projects}) => {

  
  return (
    <div className="project-list section">
      { projects && projects.map(project => {
        tags.map((tag) => {
          if (project.category === tag) {
              return (
                <Link to={'/project/' + project.id}>
                  <ProjectSummary project={project} key={project.id} />
                </Link>
              );
            } else {
              return (
                <a href="/">Sorry! no tags for that search</a>
              );
            }
          })
      })}           
    </div>
  );
}

export default SearchList;
