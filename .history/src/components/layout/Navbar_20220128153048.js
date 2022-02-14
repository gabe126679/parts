import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

const linkStyle = {
    position: 'absolute',
    display: 'flex',
    left: 120
};
const searchStyle = {
  position: 'absolute',
  top: '10rem',
  width: "220px",
  display: 'flex',
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