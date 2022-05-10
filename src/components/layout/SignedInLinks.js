import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { projectFirestore } from '../../config/fbConfig';
import Scart from "../images/shopping-cart.png";

const SignedInLinks = (props) => {
  const { notifications, auth } = props;

  const [Open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);
  
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
          setCart(user.data().cartItems.length);
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


  return (
    <div  id="header" >
     
      <ul data-aos="fade-in" data-aos-duration="1500" className="right">
        <li className="allLinks"><NavLink to='/create'>New Project</NavLink></li>
        <li className="allLinks"><NavLink to='/signin' onClick={props.signOut}>Create Product</NavLink></li>
        <li><NavLink to='/notifications' id="notification-link" className="btn btn-floating">{props.profile.initials}</NavLink></li>
      </ul>   
      
      {(() => {
        if (count > 0 && count < 10) {
          return <div className="badge"><div className="message-count">{count}</div>
          <br/>
                </div>
        } else if (count >= 10) {
          return <div className="badge"><div className="double-count">{count}</div>
          </div>
        }
      })()}
      <div id="dropdown">
        <button id="bars" className="link" onClick={handleClick}><FontAwesomeIcon style={{color: "white"}} icon={faBars} /></button>
          {(() => {
            if (Open) {
              return (
                <div id="dropdown-menu">
                  <div className="container" id="dropdown-content">
                    <div className="nav-block container" >
                      <br/>
                      <button onClick={() => {
                        setOpen(false);
                      }} className="nav-close btn btn-three">X</button>
                      <br/>
                      <NavLink className="nav-links new-project" to='/create' onClick={handleClick}>New Project</NavLink>
                      <NavLink className="nav-links new-project" to='/notifications' onClick={handleClick}>Notifications</NavLink>
                      <NavLink className="nav-links new-project" to='/' onClick={props.signOut}>Sign Out</NavLink>
                    </div>
                  </div>
                </div>
              )
            } 
            if (cart > 0 && cart < 10) {
              return <Link to="/test">
              <div className="cart-badge">
                <div className="cart-count">{cart}
                </div>
              </div>

                <img src={Scart} className="img-cart "/>
            </Link>
            } else if (cart >= 10 || cart <= 0) {
              return <Link to="/test">

                <img src={Scart} className="img-cart "/>
            </Link>
            }
          })()}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {

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