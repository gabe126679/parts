import React, { useEffect } from 'react';
import { projectFirestore } from '../../config/fbConfig'
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateNotification } from '../../store/actions/notificationActions';

const Loading = (props) => {
    const { notifications, auth } = props;

    useEffect(async () => {
        if (notifications) {
            notifications.map(async item => {
                const response = projectFirestore.collection('users');
                const data = await response.get()
                data.docs.forEach(doc => {
                    if (doc.id === auth.uid && doc.data().viewedUpdates.length === 0) {
                        doc.data().viewedUpdates.push(item.id);
                        props.updateNotification(item);
                    }
                });

            }) 
        }
        props.history.push('/');
    })

    return (
        <div className="section">
            <h1> loading... </h1>
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
      connect(mapStateToProps, mapDispatchToProps),      firestoreConnect([
        { collection: 'notifications', orderBy: ['time', 'desc']}
      ])
    )(Loading);