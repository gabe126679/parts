import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SignedInLinks = (props) => {
  const { notifications } = props;


  const [Open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [notifications]);

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
      <ul className="right">
        <li className="allLinks"><NavLink to='/create'>New Project</NavLink></li>
        <li className="allLinks"><a onClick={props.signOut}>Log Out</a></li>
        <li><NavLink to='/' id="notification-link" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
      </ul>
      <div className="badge">
        <div className="message-count">count</div>
      </div>
      
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notifications: state.firestore.ordered.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);