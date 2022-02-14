import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';




class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  } 
  hangleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  } 
  hangleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  } 
  
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to='/'/>
    return (
      <div className="container">
        <form onSubmit={this.hangleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.hangleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.hangleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">firstName</label>
            <input type="text" id="firstName" onChange={this.hangleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">lastName</label>
            <input type="text" id="lastName" onChange={this.hangleChange}></input>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
            Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapDispatchToProps)(SignUp);