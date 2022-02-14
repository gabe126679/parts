import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import ProjectSummary from '../projects/ProjectSummary'
import ExhaustList from "../projects/ExhaustList";
import FuelAndAirList from "../projects/FuelAndAirList";
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
        console.log(this.state.category)
    }
    const handleClick2 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
  }
      const handleClick3 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
  }
      const handleClick4 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
  }
      const handleClick5 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
  }
      const handleClick6 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
  }
      const handleClick7 = () => {
      if (this.state.category === "engine parts and accessories") {
        this.setState({
          category: ""
        });
      } 
        this.setState({
          category: "engine parts and accessories"
        });
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
          {/* {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick}>Fuel and Air</button></a>      
            }
          })()}           */}
            {/* <a  href="#about"><button id="exhaust" onClick={handleClick}>exhaust</button></a> */}
            <a href="#contact"><button id="engine parts and accessories" onClick={handleClick2}>engine parts and accessories</button></a>
            <a  href="#about"><button id="fuel and air" onClick={handleClick3}>lights and electrical</button></a>
            <a  href="#about"><button id="lights and electrical" onClick={handleClick4}>lights and electrical</button></a>
            <a  href="#about"><button id="brakes" onClick={handleClick5}>brakes</button></a>
            <a  href="#about"><button id="tires and wheels" onClick={handleClick6}>tires and wheels</button></a>
            <a  href="#about"><button id="custom" onClick={handleClick7}>custom</button></a>

          </div>
          {(() => {
              if (
                this.state.category === "exhaust") {
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
                this.state.category === "engine parts and accessories") {
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
              } else {
                return <div className="col s12 m6">
                  <ProjectList projects={projects} />         
                </div>        
              }  
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