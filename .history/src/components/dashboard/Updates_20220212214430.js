import React from 'react'
import { projectFirestore } from '../../config/fbConfig'
import { updateNotification } from '../../store/actions/notificationActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';

const Updates = (props) => {
    const { notifications, auth, seen } = props;
    
    const handleClick = (e) => {
        
        notifications.map(async (item) => {
            const response = projectFirestore.collection('users');
            const data = await response.get()
            data.docs.forEach(async doc => {
                if (doc.id === auth.uid && !doc.data().viewedUpdates.includes(item.id) && item.id === e.target.value) {
                    seen.current = [...seen.current, item.id]
                    props.updateNotification(item);
                    // props.addNotification(item);
                }
                
            });

        })

    }
    
    notifications && notifications.map(item => { 
        console.log(seen.current)
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
    )(Updates);