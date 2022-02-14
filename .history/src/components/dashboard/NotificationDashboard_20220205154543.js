import moment from 'moment';
import React, { useEffect} from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';


const NotificationDashboard = (props) => {
    const { notifications, projects } = props;

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
              { notifications && notifications.map((item) => { return <li key={item.id}>
                    {/* <span className='pink-text'>{(() => {
                    if (item.content === "Added a new project") {
                        return item.user + " ";
                    } else {
                        return "a new user ";
                    }})()}  */}
                    <span className='pink-text'>{item.user} </span>
                    <span>{item.content} </span> <h5 className='right' >hi</h5>
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