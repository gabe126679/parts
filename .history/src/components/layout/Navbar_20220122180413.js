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

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <nav className="nav-wrapper grey darken-3">
          <div className="fa fa-bars" aria-hidden="true">
            <Link to='/' className="brand-logo" style={linkStyle}>Motorcycles</Link>
            { links }
          </div>
          <i class="fa fa-bars" aria-hidden="true"></i>
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