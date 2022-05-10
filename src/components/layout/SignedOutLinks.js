import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div >
      <ul className="left" id="signout">
        <li><NavLink className="signup" to='/signup' >Signup</NavLink></li>
        <li><NavLink className="login" to='/signin' >Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks