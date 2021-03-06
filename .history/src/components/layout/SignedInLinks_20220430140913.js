import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { projectFirestore } from '../../config/fbConfig'

const SignedInLinks = (props) => {
  const { notifications, auth } = props;

  const [Open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  
  let items = [];

  useEffect(async () => {

    const response = projectFirestore.collection('notifications');
    const data = await response.get()
    data.docs.forEach(async doc => {
      items.push(doc);
      const response = projectFirestore.collection('users');
      const data = await response.get()
      data.docs.forEach(user => {
        if (user.id === auth.uid) {
          setCount(items.length - user.data().viewedUpdates.length);
        }
  
      });
      
    });
  }, [notifications]);

  const handleClick = () => {
    if (Open) {
      setOpen(false);
      } else {
      setOpen(true);
      }
  }

  const signOut = () => {
    props.signOut;
    <Redirect to='/signin'/>
  }

  return (
    <div  id="header" >
      <ul className="right">
        <li className="allLinks"><NavLink to='/create'>New Project</NavLink></li>
        <li className="allLinks"><a onClick={signOut}>Log Out</a></li>
        <li><NavLink to='/notifications' id="notification-link" className="btn btn-floating">{props.profile.initials}</NavLink></li>
      </ul>      
      {(() => {
        if (count > 0 && count < 10) {
          return <div className="badge"><div className="message-count">{count}</div>
                </div>
        } else if (count >= 10) {
          return <div className="badge"><div className="double-count">{count}</div>
          </div>
        }
      })()}
      {(() => {
        if (Open) {
          return <div id="dropdown">
          <button id="bars" className="link" onClick={handleClick}><FontAwesomeIcon style={{color: "white"}} icon={faBars} /></button>
          <div id="dropdown-menu">
            <div className="container" id="dropdown-content">
              <NavLink className="new-project" to='/create' onClick={handleClick}>New Project</NavLink>
              <NavLink className="new-project" to='/notifications' onClick={handleClick}>Notifications</NavLink>
              <NavLink className="new-project" to='/' onClick={props.signOut}>Sign Out</NavLink>
            </div>
          </div>
        </div>
        } else {
          return <div id="dropdown">
            <button id="bars" className="link" onClick={handleClick}><FontAwesomeIcon style={{color: "purple"}} icon={faBars} />
          
            </button>
          </div>
        }
      })()}

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);