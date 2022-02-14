import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';


const NotificationDashboard = (props) => {
    const { notifications, auth } = props;

    const handleClick = (e) => {
        notifications.map((item) => {
            const response = projectFirestore.collection('notifications');
            if (!item.viewedBy.includes(auth.uid)) {
                response.update({
                    viewedBy: [auth.uid]
                })
            }
            // const data = 
            // data.docs.forEach(doc => {
            //     // if (!item.viewedBy.includes(auth.uid)) {
            //     //     // doc._delegate._document.data.value.mapValue.fields.viewedBy.arrayValue.values.push(auth.uid);
            //     // }
                
            //     console.log(item.viewedBy);
            //     console.log(doc);
            // });


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
    console.log(state);
      return {
          projects: state.firestore.ordered.projects,
          auth: state.firebase.auth,
          notifications: state.firestore.ordered.notifications
          
      }
      
  }
  
  export default compose(
      connect(mapStateToProps),
      firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
  )(NotificationDashboard);