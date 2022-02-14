// import { doc, updateDoc, arrayUnion } from "firebase/firestore";

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

export const updateNotification = (item, updates) => {
  return async (dispatch, getState, { getFirebase,  getFirestore }) => {

    const firebase = getFirebase();
    const firestore = getFirestore();
    const viewerId = getState().firebase.auth.uid;

    await firestore.collection("notifications").doc(item).update(updates);
    const doc = await firestore.collection("notifications").doc(item).get();
    
    const update = {
      item: doc.item,
      ...doc.data()
    }
    console.log(update);
    return update;
    // const userRef = await firestore.collection("notifications").get()
    // userRef.docs.forEach(doc => {
    //     if (doc.id === item) {
    //       doc.ref.update({ content: "hello"});
    //     }
    // })

    }}.then(() => {
        dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS' });
    }).catch((err) => {
        dispatch({ type: 'UPDATE_NOTIFICATION_ERROR', err });
    });
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