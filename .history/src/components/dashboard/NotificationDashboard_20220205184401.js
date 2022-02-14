import moment from 'moment';
import React from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';


const NotificationDashboard = (props) => {
    const { notifications, auth } = props;

    const handleClick = (e) => {
        // notifications.map((item) => {
            
        //     console.log(item.viewedBy);
        // })
        return props.updateNotification(auth.uid)
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
                    <button onClick={handleClick}className='align-right' value={item}>mark as read</button>
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
        updateNotification: (project) => dispatch(updateNotification(project))
    }
}
  
  export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
  )(NotificationDashboard);