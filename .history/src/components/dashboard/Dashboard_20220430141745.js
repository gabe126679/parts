import React, { Component } from 'react';
import ProjectSummary from '../projects/ProjectSummary'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom"
import { updateVote} from '../../store/actions/projectActions';
import Footer from "../layout/Footer"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "top",
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
                category: "top"
              });
            } else {
              this.setState({
                category: e.target.id
              });
            }
          })
          if (e.target.id === "all") {
            this.setState({
              category: "top"
            });
          }
          console.log(notifications)

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
      <div>
      <div className="dashboard container">
        <br/>
        <div className="search-container">
          <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>
        <div className="browse-heading">
          <h5 className="browse-text">Browse Categories:</h5>
        </div>
        <br/> 
        <div className="row">
          <div className="scrollmenu">
          
          {(() => {
            return (
              <div>
                <a><button className="btn btn-three" id="all" onClick={handleClick}>top products</button></a>
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
          <h5 className="flow-text">{this.state.category} products</h5>
          <div className="project-container">
            <div className="col s12 m6">
                  { projects && projects.map(project => {
                      if (project.category === this.state.category || this.state.category === "top") {
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
            
            <h5 className="flow-text">Exhaust:</h5>



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
            <div className="block-divider">
                <h3 className="block-header">Follow Our Journey</h3>
                <button className="btn block-button">About Us</button>
            </div>
            <h5 className="flow-text">Brakes:</h5>
            <div className="project-container">
              <div className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "brakes") {
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
            <br/>
            <h5 className="flow-text">Body:</h5>
            <div className="project-container">
              <div className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "brakes") {
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
        <div className="block-divider">
            <h3 className="block-header">Stay Up To Date</h3>
            <div className="block-email contact-input">
                <input type="email" placeholder="example@gmail.com" className="mailing-list-email"/>
                <Link to="/"><a href="/">Continue</a></Link>
            </div>
            <br/>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {

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
      { collection: 'notifications'}
    ])
)(Dashboard);