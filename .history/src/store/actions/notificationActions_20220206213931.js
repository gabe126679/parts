export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      const viewerFirstName = getState().firebase.auth.firstName;
      const viewerLastName = getState().firebase.auth.lastName;
      const viewerInitials = getState().firebase.auth.initials;
      const updates = getState().firestore.ordered.notifications;
  
      // ({
      //   viewedBy: firestore.FieldValue.arrayUnion(viewerId)
      // })

        firestore.collection('users').doc(viewerId).set({
          firstName: viewerFirstName,
          lastName: viewerLastName,
          initials: viewerInitials,
          viewedUpdates: firestore.FieldValue.arrayUnion(viewerId)
        })
        .then(() => {
            dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
        });

    }
  }