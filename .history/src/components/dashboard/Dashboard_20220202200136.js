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
        if (this.state.category === "") {
          this.setState({
            category: "exhaust"
          });
        } else {
          this.setState({
            category: ""
          });
        }
        console.log(this.state.category)
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
            // if (this.state.category === "exhaust") {
            //     return <a><button onClick={handleClick}>All Products</button></a>
            // } else {
            //     return <a><button onClick={handleClick}>Exhaust</button></a>      
            // }
          })()}
          {/* {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick}>Fuel and Air</button></a>      
            }
          })()}           */}
            <a  href="#about"><button id="exhaust" onClick={handleClick}>exhaust</button></a>
            <a href="#contact"><button id="exhaust" onClick={handleClick2}>engine parts and accessories</button></a>
            <a  href="#about"><button id="lights and electrical" onClick={handleChange}>lights and electrical</button></a>
            <a href="#support">brakes</a>
            <a href="#blog">Blog</a>
            <a href="#tools">body</a>  
            <a href="#base">tires and wheels</a>
            <a href="#custom">Custom</a>
            <a href="#more">More</a>

          </div>
          {(() => {
          //   if (this.state.category === "exhaust") {
          //     return (
          //       <div className="col s12 m6">
          //         { projects && projects.map(project => {
          //             if (project.category === this.state.category) {
          //               return (
          //                 <Link to={'/project/' + project.id}>
          //                   <ProjectSummary project={project} key={project.id} />
          //                 </Link>
          //               );
          //             }
          //         })}           
          //       </div>
          //     );
          // } else if (this.state.category === "fuel and air") {
          //     return <div className="col s12 m6">
          //       <FuelAndAirList projects={projects} />         
          //     </div>        
          // } else {
          //       return <div className="col s12 m6">
          //         <ProjectList projects={projects} />         
          //       </div>        
          //   }
            this.props.projects && this.props.projects.map(project => {
              if (project.category === this.state.category) {
                return (
                  <Link to={'/project/' + project.id}>
                    <ProjectSummary project={project} key={project.id} />
                  </Link>
                );
              } else {
                return <div className="col s12 m6">
                  <ProjectList projects={projects} />         
                </div>        
                  }
            })
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