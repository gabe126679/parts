import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectSummary from '../projects/ProjectSummary'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom"
import { updateVote} from '../../store/actions/projectActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      search: "",
      categories: ["exhaust", "engine parts and accessories", "fuel and air", "lights and electrical", "brakes", "body", "tires and wheels", "custom"]
    };
  }
  
  render() {
    let { projects, auth, notifications } = this.props;    
    
    const handleClick = (e) => {

        
        this.state.categories.map((tag) => {
            if (e.target.id === tag) {
              this.setState({
                category: ""
              });
            } else {
              this.setState({
                category: e.target.id
              });
            }
          })
          if (e.target.id === "all") {
            this.setState({
              category: ""
            });
          }
          console.log(this.state.category)

        }

      const handleChange = (e) => {

        this.props.projects.map((project) => {
          if (project.name === this.state.search) {
            this.setState({
              category: this.state.search
            });
          }
          this.setState({
            [e.target.id]: e.target.value
          });
        })

      }
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <br/>
        <div className="search-container">
          <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>
          <h5 className="browse-heading">Browse Categories:</h5>
        <br/> 
        <div className="row">
          <div className="scrollmenu">
          
          {(() => {
            return (
              <div>
                <a><button className="btn btn-three" id="all" onClick={handleClick}>all products</button></a>
                <a><button className="btn btn-three" id="exhaust" onClick={handleClick}>exhaust</button></a>
                <a><button className="btn btn-three" id="engine parts and accessories" onClick={handleClick}>engine parts and accessories</button></a>
                <a><button className="btn btn-three" id="fuel and air" onClick={handleClick}>fuel and air</button></a>
                <a><button className="btn btn-three" id="lights and electrical" onClick={handleClick}>lights and electrical</button></a>
                <a><button className="btn btn-three" id="brakes" onClick={handleClick}>brakes</button></a>
                <a><button className="btn btn-three" id="body" onClick={handleClick}>body</button></a>
                <a><button className="btn btn-three" id="tires and wheels" onClick={handleClick}>tires and wheels</button></a>
                <a><button className="btn btn-three" id="custom" onClick={handleClick}>custom</button></a>
              </div>
            )
          })()}
          </div>
          <h5 className="flow-text">Top Products:</h5>
          <div className="project-container">
            <div className="col s12 m6">
                  { projects && projects.map(project => {
                      if (project.category === this.state.category || this.state.category === "") {
                        return (
                          <div className="project-filler">
                          <div className="project-element">
                            <button className="vote btn btn-primary" id="vote" onClick={() => {
                              this.props.updateVote(auth.uid, project.id);
                            }}>  Vote </button>                                
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          </div>
                      </div>
                        );
                      } 
                  })}           
              </div>
          </div>
          <br/>
            
            <h5 className="flow-text">Exhaust Parts:</h5>



            <div className="project-container">
              <div className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "exhaust") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            <button className="vote btn btn-primary" onClick={() => {
                              this.props.updateVote(auth.uid, project.id);
                            }}>  Vote </button>
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>
            </div> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
        
    }
    
}

const mapDispatchToProps = dispatch => {
    
  return {
    updateVote: (voter, project) => dispatch(updateVote(voter, project))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc']},
      { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard);