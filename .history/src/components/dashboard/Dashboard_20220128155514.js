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



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ""
    };
  }

  

  render() {
    let { projects, auth, notifications } = this.props;    

    const linkStyle = {
      position: 'absolute',
      top: 100px;
    };
    const searchStyle = {
    position: 'absolute',
    top: '0em',
    right: "0em",
    left: "-5em",
    width: "420px",
    height: "1px",
    display: 'flex',
    textAlign: 'left',
    color: 'blue',
    backgroundColor: 'white'
    };
    const submitStyle = {
    position: 'absolute',
    top: '2.7em',
    left: "280px",
    width: "60px",
    
    backgroundColor: 'grey'
    };

    const handleExhaustClick = () => {
      if (this.state.category === "" || this.state.category === "fuel and air") {
        this.setState({ category: "exhaust" });
      } else {
        this.setState({ category: "" });
      }
    }
    const handleFuelAndAirClick = () => {
      if (this.state.category === "" || this.state.category === "exhaust") {
        this.setState({ category: "fuel and air" });
      } else {
        this.setState({ category: "" });
      }
    }
    
    current = this.state.category;
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
          <form style={linkStyle} action="/">
            <input style={searchStyle}type="search" id="search" name="search" placeholder="Search Tags"/>
            <input style={submitStyle} type="submit"/>
          </form>
        <div className="row">
          <div class="scrollmenu">
          {(() => {
            if (this.state.category === "exhaust") {
                return <a><button onClick={handleExhaustClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleExhaustClick}>Exhaust</button></a>      
            }
          })()}
          {(() => {
            if (this.state.category === "fuel and air") {
                return <a><button onClick={handleFuelAndAirClick}>All Products</button></a>
            } else {
                return <a><button onClick={handleFuelAndAirClick}>Fuel and Air</button></a>      
            }
          })()}          
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