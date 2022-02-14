export const createProject = (project) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log(project);
      // make async call to database
      console.log(project);
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').add({
        ...project,
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

export const deleteProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      console.log(getState(project))
        firestore.collection('projects').doc(project).delete().then(() => {
            dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
          }).catch((err) => {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err });
          });

    }
  };
//   export const deleteProject = (project) => {
//     return (dispatch, getState, {getFirebase}) => {
//       const firebase = getFirebase();
  
//       firebase.auth().signOut().then(() => {
//         dispatch({ type: 'DELETE_SUCCESS' })
//       });
//     }
//   }