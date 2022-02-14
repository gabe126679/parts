import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import ProjectSummary from '../projects/ProjectSummary'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom"

export let current = "";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      search: "",
      tags: ["exhaust", "fuel and air", "engine parts and accessories", "lights and electrical", "brakes", "tires and wheels", "custom"]
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
      const handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
        this.props.projects.map((project) => {
          if (project.name === this.state.search) {
            this.setState({
              category: this.state.search
            });
          }
        })

      }

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   this.setState({
    //     [e.target.id]: null
    //   });
    // } 
    
    current = this.state.search;
    
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="searchBox">
            <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>
        <div className="row">
          <div className="scrollmenu">
          {(() => {
            if (this.state.category === "exhaust") {
                return <a><button onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick}>exhaust</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "engine parts and accessories") {
                return <a><button onClick={handleClick2}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick2}>engine parts and accessories</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button onClick={handleClick3}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick3}>fuel and air</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "lights and electrical") {
                return <a><button onClick={handleClick4}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick4}>lights and electrical</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "brakes") {
                return <a><button onClick={handleClick5}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick5}>brakes</button></a>      
            }
          })()}
                    {(() => {
            if (this.state.category === "body") {
                return <a><button onClick={handleClick6}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick6}>body</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "tires and wheels") {
                return <a><button onClick={handleClick7}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick7}>tires and wheels</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "custom") {
                return <a><button onClick={handleClick8}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick8}>custom</button></a>      
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
              } else {
                return (
                  <div className="col s12 m6">
                    { projects && projects.map(project => {
                        if (project.title === this.state.search || project.authorFirstName === this.state.search) {
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
              // } else {
              //   return <div className="col s12 m6">
              //     <ProjectList projects={projects} />         
              //   </div>        
              // }  
          })()}
                          {/* <div className="col s12 m6">
                  <ProjectList projects={projects} />         
                </div>   */}
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc']},
      { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard);