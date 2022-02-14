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
  left: "-5em",
  width: "420px",
  height: "19px",
  display: 'flex',
  align: 'center',
  backgroundColor: 'white'
};
const submitStyle = {
  position: 'absolute',
  top: '2.7em',
  left: "280px",
  width: "60px",

  backgroundColor: 'grey'
};

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3">
        <div >
          {/* <Link to='/' style={linkStyle}>Motorcycles</Link> */}
          <form style={linkStyle} action="/">
            <input style={searchStyle}type="search" id="search" name="search" placeholder="Search Tags"/>
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