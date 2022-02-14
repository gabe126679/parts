import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

const linkStyle = {
    position: 'absolute',
    top: "0.7em",
    left: "10.8em",
    fontSize: "20px",
    fontFamily: "Impact", 
    display: 'flex',
};

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3" id="nav">
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