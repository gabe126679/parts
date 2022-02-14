import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';


const NotificationDashboard = (props) => {
    const { notifications, auth } = props;

    const handleClick = (e) => {
        notifications.map(async (item) => {
            const response = projectFirestore.collection('notifications');
            const data = await response.get()
            data.docs.forEach(doc => {
                // if (doc.user === e.target.value) {
                //     doc.viewedBy.push(e.target.value);                    
                // }
                console.log(doc._delegate._document.data.value.mapValue.fields.viewedBy.arrayValue.values);
                // console.log(doc._delegate);
            });

            console.log(item.viewedBy);
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
                    <button onClick={handleClick}className='align-right' value={item.user}>mark as read</button>
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