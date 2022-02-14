import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

const linkStyle = {
    position: 'absolute',
    top: "0.6em",
    left: "1.6em",
    fontSize: "20px",
    fontFamily: "Impact", 
    display: 'flex',
};

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3">
        <div >
          <Link to='/' style={linkStyle}>PartsFinder</Link>
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