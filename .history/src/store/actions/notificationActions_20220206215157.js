export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      // ({
      //   viewedBy: firestore.FieldValue.arrayUnion(viewerId)
      // })
        const ref =firestore.collection('users').doc(viewerId)
        if (!ref.data().viewedUpdates.includes(item.id)) {
            ref.update({
                viewedUpdates: firestore.FieldValue.arrayUnion(item.id)
            })
            .then(() => {
                dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
            });
        }
    }
  }