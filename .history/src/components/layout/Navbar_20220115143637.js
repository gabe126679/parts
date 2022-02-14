import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const linkStyle = {
    position: 'absolute',
    display: 'flex',
    left: 200
};

const Navbar = () => {
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

export default Navbar;