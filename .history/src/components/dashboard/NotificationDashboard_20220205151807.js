import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'


const NotificationDashboard = () => {
    let notifications = [];
    useEffect(async () => {
        const response = projectFirestore.collection('notifications');
        const data = await response.get()
        data.docs.forEach(doc => {
          notifications.push(doc);
        });
        
    }, [])

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            { notifications && notifications.map(item => { 
              return <li key={item.id}>
                {/* <span className='pink-text'>{(() => {
                  if (item.content === "Added a new project") {
                    return item.user + " ";
                  } else {
                    return "a new user ";
                  }})()}  */}
                <span className='pink-text'>{item.user} </span>
                <span>{item.content} </span>
                <div className="grey-text note-date">
                  {moment(item.time.toDate()).fromNow()}
                </div>
              </li>  
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.firebase);
  return {
    notifications: state.firestore.ordered.notifications
  }
}

export default NotificationDashboard;