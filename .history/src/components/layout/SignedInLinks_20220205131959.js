import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SignedInLinks = (props) => {
  const [Open, setOpen] = useState(false);


  const handleClick = () => {
    if (Open) {
      setOpen(false);
      } else {
      setOpen(true);
      }
 

    }
    





  // useEffect(() => {
  //   if (Open) {
  //       document.addEventListener("click", () => {
  //         setOpen(false);
  //       });
  //     }

  // }, [Open]);


  return (
    <div  id="header" >
      <ul id="allLinks" className="right">
        <li><NavLink to='/create'>New Project</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li><NavLink to='/' id="notification-link" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
      </ul>
      
      {(() => {
        if (Open) {
          return <div id="dropdown">
          <button id="bars" className="link" onClick={handleClick}><FontAwesomeIcon style={{color: "red"}} icon={faBars} /></button>
          <div id="dropdown-menu">
            <div className="container" id="dropdown-content">
              <NavLink className="new-project" to='/create' onClick={handleClick}>New Project</NavLink>
              <NavLink className="new-project" to='/notifications' onClick={handleClick}>Notifications</NavLink>
              <NavLink className="new-project" to='/' onClick={props.signOut}>Sign Out</NavLink>
            </div>
          </div>
        </div>
        } else {
          return <button id="bars" className="link" onClick={handleClick}><FontAwesomeIcon style={{color: "blue"}}icon={faBars} /></button>
          
        }
      })()}

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);