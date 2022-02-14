import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateNotification } from '../../store/actions/notificationActions';
// import { addNotification } from '../../store/actions/notificationActions';

const NotificationDashboard = (props) => {
    const { notifications, auth } = props;
    const seen = useRef(new Array());
    const [saw, setSaw] = useState([]) 

    const handleClick = (e) => {
        
        notifications.map(async (item) => {
            const response = projectFirestore.collection('users');
            const data = await response.get()
            data.docs.forEach(async doc => {
                if (doc.id === auth.uid && !doc.data().viewedUpdates.includes(item.id) && item.id === e.target.value && !seen.current.includes(item.id)) {
                    seen.current = [...seen.current, item.id]
                    props.updateNotification(item);
                    // props.addNotification(item);
                }
                
            });

        })

    }

    const handleAll = async () => {
        
        await notifications.map(async item => {

            const response = projectFirestore.collection('users');
            const data = await response.get()
            data.docs.forEach(doc => {
                if ((doc.id === auth.uid)) {
                    props.updateNotification(item)
                }
            });
        })
    }
    useEffect(async () => {
        if (notifications.length === seen.current.length) {
            setSaw([]);
            seen.current.reset();
        }
    })

    useEffect(async () => {
        if (notifications) {
            notifications.map(async item => {
                const response = projectFirestore.collection('users');
                const data = await response.get()
                data.docs.forEach(doc => {
                    if (doc.id === auth.uid && doc.data().viewedUpdates.includes(item.id) && !seen.current.includes(item.id)) {
                        seen.current = [...seen.current, item.id]

                    }
                });

            }) 
        }
    })

    useEffect(async () => {
        if (notifications) {
            notifications.map(async (item) => {
                const response = projectFirestore.collection('users');
                const data = await response.get()
                data.docs.forEach(async doc => {
                    if (doc.id === auth.uid && !doc.data().viewedUpdates.includes(item.id) && !saw.includes(item.id)) {
                        setSaw(saw.concat(item.id))
                    } 
                    
                });
    
            })
        }

    })

    const handleNoise = () => {
        console.log(notifications.length);
        console.log(seen.current.length);
        console.log(saw)
    }


  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>   
          <button className="right" onClick={handleAll}>mark all as read</button>
          <button className="right" onClick={handleNoise}>mark</button>
          <br/>
          <ul className="online-users center">

{
    notifications && notifications.map(item => { 
            if (!seen.current.includes(item.id)) {
                return <li key={item.id}>
                <span className='pink-text'>{item.user} </span>
                <span>{item.content} </span> 
                <div className="grey-text note-date">
                {moment(item.time.toDate()).fromNow()}
                </div>     
                <button onClick={handleClick} value={item.id}> mark as read </button>
                </li> 
            }
    
    })
}



   
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
        // addNotification: (note) => dispatch(addNotification(note))
    }
}
  
  export default compose(
      connect(mapStateToProps, mapDispatchToProps),      firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
    )(NotificationDashboard);