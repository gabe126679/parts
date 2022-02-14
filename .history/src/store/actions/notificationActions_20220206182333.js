export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      const updates = getState().firestore.ordered.notifications;
  
      // ({
      //   viewedBy: firestore.FieldValue.arrayUnion(viewerId)
      // })
      updates.map((update) => {
  
        if (update.id === item.id) {
          firestore.collection('notifications').doc(update.id).set({
            juice: item.id
          })
          .then(() => {
            dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
        });
        }
      });
    }
  }