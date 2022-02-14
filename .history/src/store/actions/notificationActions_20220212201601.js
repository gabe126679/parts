export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const viewerId = getState().firebase.auth.uid;
          firestore.collection('users').doc(viewerId).update({
            viewedUpdates: firestore.FieldValue.arrayUnion(item.id)
        })
        // .then(() => {
          // firestore.collection('note').add({
          //   note: firestore.FieldValue.arrayUnion(item.id),
          //   viewer: viewerId
          // })
        // })
        .then(() => {
            dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
        });

    }
  }

export const addNotification = (item) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      firestore.collection('note').set({
        note: firestore.FieldValue.arrayUnion(item.id),
        viewer: viewerId
      })
      .then(() => {
          dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
      });

  }
}