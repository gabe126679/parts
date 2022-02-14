import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'



const Navbar = (props) => {
    const { auth, profile, notifications } = props;
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //   setCount(count + 1);
    // }, [notifications.length]);

    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
      <nav className="nav-wrapper grey darken-3" id="nav">
        <div className="parts-container" >
          <Link to='/' ><p className="parts-link">PartsFinder</p></Link>
          { links }
        </div>
        <div className="badge">
          <div className="message-count">{count}</div>
        </div>
      </nav>
      )   
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      notifications: state.firestore.ordered.notifications
    }
}

export default connect(mapStateToProps)(Navbar);