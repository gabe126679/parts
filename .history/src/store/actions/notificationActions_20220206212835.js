export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      const updates = getState().firestore.ordered.users;
  
      // ({
      //   viewedBy: firestore.FieldValue.arrayUnion(viewerId)
      // })
      updates.map((update) => {

        firestore.collection('users').doc(update.id).update({
        viewedUpdates: [item.id]
        })
        .then(() => {
            dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
        });
        
      });
    }
  }