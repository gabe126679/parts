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
    };
  }
  
  render() {
    let { projects, auth, notifications } = this.props;    


    
    const handleClick = () => {
        if (this.state.category === "exhaust") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "exhaust"
          });
        }
    }
    const handleClick2 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } else {
        this.setState({
          category: "engine parts and accessories"
        });
      }
      }
      const handleClick3 = () => {
        if (this.state.category === "fuel and air") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "fuel and air"
          });
        }
      }
      const handleClick4 = () => {
        if (this.state.category === "lights and electrical") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "lights and electrical"
          });
        }
      }
      const handleClick5 = () => {
        if (this.state.category === "brakes") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "brakes"
          });
        }
      }
      const handleClick6 = () => {
        if (this.state.category === "body") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "body"
          });
        }
      }
      const handleClick7 = () => {
        if (this.state.category === "tires and wheels") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "tires and wheels"
          });
        }
      }
      const handleClick8 = () => {
        if (this.state.category === "custom") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "custom"
          });
        }
      }
      const handleClick9 = () => {
        if (this.state.category === "my products") {
          this.setState({
            category: ""
          });
        } else {
          this.setState({
            category: "my products"
          });
        }
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
        <div className="searchBox">
            <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>

        <div className="row">
          <div className="scrollmenu">
          {(() => {
            if (this.state.category === "my products") {
                return <a><button className="btn btn-three" onClick={handleClick9}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick9}>my products</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "exhaust") {
                return <a><button className="btn btn-three" onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick}>exhaust</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "engine parts and accessories") {
                return <a><button className="btn btn-three" onClick={handleClick2}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick2}>engine parts and accessories</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button className="btn btn-three" onClick={handleClick3}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick3}>fuel and air</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "lights and electrical") {
                return <a><button className="btn btn-three" onClick={handleClick4}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick4}>lights and electrical</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "brakes") {
                return <a><button className="btn btn-three" onClick={handleClick5}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick5}>brakes</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "body") {
                return <a><button className="btn btn-three" onClick={handleClick6}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick6}>body</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "tires and wheels") {
                return <a><button className="btn btn-three" onClick={handleClick7}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick7}>tires and wheels</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "custom") {
                return <a><button className="btn btn-three" onClick={handleClick8}>All Products</button></a>
            } else {
                return <a><button className="btn btn-three" onClick={handleClick8}>custom</button></a>      
            }
          })()}

          </div>
          {(() => {
              if (
                this.state.category === "exhaust" || this.state.search === "exhaust") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "exhaust") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "engine parts and accessories" || this.state.search === "engine parts and accessories") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "engine parts and accessories") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "fuel and air" || this.state.search === "fuel and air") {
                return (
                  <div className="col s12 m6">
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
              } else if (
                this.state.category === "lights and electrical" || this.state.search === "lights and electrical") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "lights and electrical") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "brakes" || this.state.search === "brakes") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "brakes") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "body" || this.state.search === "body") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "body") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "tires and wheels" || this.state.search === "tires and wheels") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "tires and wheels") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "custom" || this.state.search === "custom") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.category === "custom") {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              } else if (
                this.state.category === "my products") {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.authorId === auth.uid) {
                          return (
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          );
                        }
                    })}           
                  </div>
                );
              }else {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if ((project.title === this.state.search || project.content === this.state.search || project.authorFirstName === this.state.search || project.authorLastName === this.state.search || this.state.search === "") && !project.votedOn.includes(auth.uid)) {
                          return (
                            <div>
                              <button className="vote btn btn-primary" onClick={() => {
                                this.props.updateVote(auth.uid, project.id);
                              }}>  Vote </button>
                              <Link to={'/project/' + project.id}>
                                <ProjectSummary project={project} key={project.id} />
                              </Link>
                            </div>
                          );
                        } else if ((project.title === this.state.search || project.content === this.state.search || project.authorFirstName === this.state.search || project.authorLastName === this.state.search || this.state.search === "") && project.votedOn.includes(auth.uid)) {
                            return (
                              <div>
                              <Link to={'/project/' + project.id}>
                                <ProjectSummary project={project} key={project.id} />
                              </Link>
                            </div>
                            )
                          }
                    })}           
                  </div>
                );   
              }  
          })()}
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />

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