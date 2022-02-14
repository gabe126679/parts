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
    const { auth } = props;
    console.log(auth);
    return (
        <nav className="nav-wrapper grey darken-3">
          <div className="container">
            <Link to='/' className="brand-logo" style={linkStyle}>Motorcycles</Link>
            <SignedInLinks />
            <SignedOutLinks />
          </div>
        </nav>
      )   
};

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);