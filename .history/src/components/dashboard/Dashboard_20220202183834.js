import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import ExhaustList from "../projects/ExhaustList";
import FuelAndAirList from "../projects/FuelAndAirList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom"

export let current = "";

export let tags = ["exhaust", "fuel and air", "engine parts and accessories", "lights and electrical", "brakes", "tires and wheels", "custom"];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      search: ""
    };
  }

  

  render() {
    let { projects, auth, notifications } = this.props;    

    const handleClick = () => {
      this.props.projects.map((tag) => {
        if (this.state.category === tag) {
          this.setState({ category: tag });
        } 
        console.log(this.state.category);
        console.log(tag);
      })
      
    }
    const handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   this.setState({
    //     [e.target.id]: null
    //   });
    // } 
    
    current = this.state.category;
    
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="searchBox">
            <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>
        <div className="row">
          <div className="scrollmenu">
          {(() => {
            tags.map((tag) => {
              if (tag === this.state.category) {
                return <a><button onClick={handleClick}>All Products</button></a>               
              } else {
                return <a><button onClick={handleClick}>tag</button></a>      
            }
            })
            if (this.state.category === "exhaust") {
                return <a><button onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick}>Exhaust</button></a>      
            }
          })()}
          {/* {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button onClick={handleClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleClick}>Fuel and Air</button></a>      
            }
          })()}           */}
            <a href="#contact">engine parts and accessories</a>
            <a href="#about">lights and electrical</a>
            <a href="#support">brakes</a>
            <a href="#blog">Blog</a>
            <a href="#tools">body</a>  
            <a href="#base">tires and wheels</a>
            <a href="#custom">Custom</a>
            <a href="#more">More</a>

          </div>
          {(() => {
            if (this.state.category === "exhaust") {
                return <div className="col s12 m6">
                  <ExhaustList projects={projects} />         
                </div>
          } else if (this.state.category === "fuel and air") {
              return <div className="col s12 m6">
                <FuelAndAirList projects={projects} />         
              </div>        
          } else {
                return <div className="col s12 m6">
                  <ProjectList projects={projects} />         
                </div>        
            }
          })()}
          {/* <div className="col s12 m6">
            <ProjectList projects={projects} />         
          </div>  */}
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