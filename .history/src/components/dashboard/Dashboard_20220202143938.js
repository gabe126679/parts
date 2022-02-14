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

export let tags = [];

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



    const linkStyle = {
    position: 'absolute',
    top: "90px",
    height: "100%",
    display: "flex",
    flexWrap: "wrap"
    };
    const searchStyle = {
    position: 'absolute',
    top: '-9em',
    right: "-10em",
    left: "12px",
    width: "420px",
    height: "19px",
    display: 'flex',
    textAlign: 'center',
    color: 'blue',
    backgroundColor: 'white',
    display: "flex",
    flexWrap: "wrap"
    };
    const submitStyle = {
    position: 'absolute',
    top: '-8.6em',
    left: "373px",
    width: "60px",
    display: 'flex',
    backgroundColor: 'grey',
    color: 'white'
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
    const handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        [e.target.id]: null
      });
    } 
    
    current = this.state.category;
    
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
          <form style={linkStyle} onSubmit={handleSubmit}>
            <input style={searchStyle} onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
          </form>
        <div className="row">
          <div className="scrollmenu">
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
            if (this.state.category === "exhaust" || this.state.search === "exhaust") {
                return <div className="col s12 m6">
                  <ExhaustList projects={projects} />         
                </div>
          } else if (this.state.category === "fuel and air" || this.state.search === "fuel and air") {
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