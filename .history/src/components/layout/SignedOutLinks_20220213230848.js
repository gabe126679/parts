import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div >
      <ul className="left" id="signout">
        <li><NavLink to='/signup' >Signup</NavLink></li>
        <li><NavLink to='/signin' >Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks