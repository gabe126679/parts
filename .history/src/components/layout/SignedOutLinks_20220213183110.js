import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SignedOutLinks = () => {
  return (
    <div >
      <ul className="left" id="signout">
        <li><NavLink to='/signup' >Signup</NavLink></li>
        <li><NavLink to='/signin' >Login</NavLink></li>
      </ul>
      {/* <header>
        <div className="logo">LOGO</div>
        <nav className="active">
          <ul>
            <li><a href="#"><NavLink to='/signup' >Signup</NavLink></a></li>
            <li><a href="#"><NavLink to='/signin' >Login</NavLink></a></li>
          </ul>
        </nav>
        <div className="menu-toggle"><FontAwesomeIcon icon={faBars} /></div>
        
      </header> */}
    </div>
  )
}

export default SignedOutLinks