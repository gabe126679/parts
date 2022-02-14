import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateVote } from '../../store/actions/projectActions';

const ProjectSummary = ({project} props) => {

  const { auth } = props;

  const handleClick = () => {
    updateVote(auth);
  }

    return (
      <div className="card z-depth-0 project-sumarry">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
            {/* {project.comments.map((post) => {
              return <p>{post.comment} {post.author}</p>
            })} */}
            <p className="right-align">{project.upvoteCount} <button onClick={handleClick}>^</button> </p>
          <div className="card-image">
            <img src={project.photos}/>
          </div>
        </div>
      </div> 
    )
}

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
      updateVote: (vote) => dispatch(updateVote(vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummary);