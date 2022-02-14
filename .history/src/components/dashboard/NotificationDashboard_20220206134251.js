import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';
import { updateNotification } from '../../store/actions/projectActions';
// import { arrayUnion } from 'firebase/firestore';

const NotificationDashboard = (props) => {
    const { notifications, auth, } = props;

    const handleClick = async (e) => {
        props.updateNotification(e.target.value, { "viewedBy": [auth.uid]})

        // const response = projectFirestore.collection('notifications');
        // const data = await response.get()
        // data.docs.forEach(doc => {
        //     if (doc.id === e.target.value) {
        //       doc.ref.update({ content: "hello"});
        //     }
        //   });
    }

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users center">
              { notifications && notifications.map((item) => { return <li key={item.id}>
                    <span className='pink-text'>{item.user} </span>
                    <span>{item.content} </span> 
                    <div className="grey-text note-date">
                    {moment(item.time.toDate()).fromNow()}
                    </div>
                    <button onClick={handleClick}className='align-right' value={item.id}>mark as read</button>
                </li>  
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {

    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
    
}

const mapDispatchToProps = dispatch => {

    return {
        updateNotification: (item, update) => dispatch(updateNotification(item, update))
    }
}
  
  export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
  )(NotificationDashboard);