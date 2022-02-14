import { updateDoc, arrayUnion } from "firebase/firestore";

export const createProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {


    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      // ...project,
      title: project.title,
      category: project.category,
      price: project.price,
      content: project.content,
      photos: [...project.photos],
      year: project.year,
      brand: project.brand,
      shippingCost: project.shippingCost,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err });
    });
  }
};

export const updateNotification = (item) => {
  return (dispatch, getState, { getFirestore}) => {


    const firestore = getFirestore();
    const viewerId = getState().firebase.auth.uid;
    const profile = getState().firestore.ordered.notifications;
    profile.map((project) => {
      console.log(project);
      if (project.id === item) {
        firestore.collection('notifications').doc(project.id).update({ 
          viewedBy: firestore.FieldValue.arrayUnion(viewerId)
        }).then(() => {
          dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
        });
      }
    })

  }
}


export const deleteProject = (proj) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      const profile = getState().firestore.ordered.projects;
      profile.map(project => {
        if (project.id === proj) {
          firestore.collection('projects').doc(project.id).delete().then(() => {
            dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
          }).catch((err) => {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err });
          });
         }
        // if (project.id === proj ) {

        }
      );
    };
  };