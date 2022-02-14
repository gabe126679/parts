import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { authIsReady, firestoreConnect } from "react-redux-firebase";
import { connect} from 'react-redux';
import { compose } from 'redux';
import { updateNotification } from '../../store/actions/notificationActions';

const NotificationDashboard = (props) => {
    const { notifications, auth } = props;
    const [seen, setSeen] = useState([]);

    const handleClick = (e) => {
        
        notifications.map(async item => {

            const response = projectFirestore.collection('users');
            const data = await response.get()
            data.docs.forEach(doc => {
                if (doc.id === auth.uid && !doc.data().viewedUpdates.includes(item.id) && item.id === e.target.value) {
                    setSeen([...seen, item.id]);
                    props.updateNotification(item);
                }
            });
        })

    }

    useEffect(() => {
        if (notifications) {
            notifications.map(async item => {
                const response = projectFirestore.collection('users');
                const data = await response.get()
                data.docs.forEach(doc => {
                    if (doc.id === auth.uid && doc.data().viewedUpdates.includes(item.id)) {
                        seen.push(item.id);
                        localStorage.setItem("items", JSON.stringify(seen))
                    }
                });
                
            })            
        } 
    }, [seen])
    
    const handleNoise = () => {
        var cool = Object.values(localStorage).toString()
        cool.map(bits => {
            console.log(bits);
        })
    }


  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users center">
            {   notifications && notifications.map(item => { 
                const link = localStorage.getItem("items".toString());
                if (!link.includes(item.id) || !seen.includes(item.id)) {
                return <li key={item.id}>
                <span className='pink-text'>{item.user} </span>
                <span>{item.content} </span> 
                <div className="grey-text note-date">
                {moment(item.time.toDate()).fromNow()}
                </div>
                <button onClick={handleNoise} value={item.id}>noise</button>      
                <button onClick={handleClick} value={item.id}> mark as read </button>
                </li> 
                }
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