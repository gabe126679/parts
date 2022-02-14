import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

import "../styles.css";


const linkStyle = {
    position: 'absolute',
    display: 'flex',
    left: 120
};

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous"></link>
        <div className="fa fa-bars" aria-hidden="true">
          <Link to='/' className="brand-logo" style={linkStyle}>Motorcycles</Link>
          { links }
        </div>
      </nav>
      )   
};

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);