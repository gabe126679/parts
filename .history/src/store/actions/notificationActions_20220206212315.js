export const updateNotification = (item) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      const updates = getState().firestore.ordered.projects;
  
      // ({
      //   viewedBy: firestore.FieldValue.arrayUnion(viewerId)
      // })
      updates.map((update) => {
  
        if (update.name === "1") {
          firestore.collection('projects').doc(project.id).set({
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