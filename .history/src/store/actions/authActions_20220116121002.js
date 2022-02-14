export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }
  
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestire = getFirestore();

      firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      ).then((resp) => {
          //automatically generates users collection if there isn't one
        return firestore.collection('users').doc(resp.user.uid).set({
          firstnName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
      }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' })
      }).cath(err => {
        dispatch({ type: 'SIGNUP_ERROR', err })
      })
    }
}