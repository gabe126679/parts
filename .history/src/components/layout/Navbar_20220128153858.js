import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

const linkStyle = {
    position: 'absolute',
    bottom: "0.5em",

    display: 'flex',
    left: 120
};
const searchStyle = {
  position: 'absolute',
  top: '1em',
  right: "1em",
  width: "220px",
  display: 'flex',
  backgroundColor: 'blue'
};
const submitStyle = {
  position: 'absolute',
  top: '1.8em',
  left: "180px",
  width: "60px",
  backgroundColor: 'blue'
};

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3">
        <div >
          {/* <Link to='/' style={linkStyle}>Motorcycles</Link> */}
          <form style={linkStyle} action="/">
            <input style={searchStyle}type="search" id="search" name="search" />
            <input style={submitStyle} type="submit"/>
          </form>
          { links }
        </div>
      </nav>
      )   
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);