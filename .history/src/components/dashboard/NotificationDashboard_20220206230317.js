import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { authIsReady, firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';
import { updateNotification } from '../../store/actions/notificationActions';

const NotificationDashboard = (props) => {
    const { notifications, auth, users } = props;

    let newItems = [];

    const handleClick = async (e) => {
        notifications.map(async item => {
            if (item.id === e.target.value) {
                const response = projectFirestore.collection('users');
                const data = await response.get()
                data.docs.forEach(doc => {
                    // if (doc.data().viewedUpdates.includes(item.id)) {
                    //     newItems.push(...doc.data().viewedUpdates);
                    // }
                    console.log(doc.data());
                    console.log(auth.uid);
                });

                props.updateNotification(item);
            }
        })
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
                    {(() => {
                        newItems.map((view) => {
                            if (!view.includes(item.id)) {
                                return <button onClick={handleClick}className='align-right' value={item.id}>mark as read</button>
                            } 
                        })
                    })()}
                        <button onClick={handleClick}className='align-right' value={item.id}>mark as read</button>
                    {/* <button onClick={handleNoise}></button> */}
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
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
    
}

const mapDispatchToProps = dispatch => {

    return {
        updateNotification: (item) => dispatch(updateNotification(item))
    }
}
  
  export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
  )(NotificationDashboard);