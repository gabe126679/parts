export const createProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').add({
      title: project.title,
      category: project.category,
      price: project.price,
      content: project.content,
      photos: project.photos,
      tags: [...project.tags],
      upvoteCount: project.upvoteCount,
      votedOn: [...project.votedOn],
      comments: [...project.comments],
      partNumber: project.partNumber,
      make: project.make,
      model: project.model,
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

export const editProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const list = getState().firestore.ordered.projects;
    const authorId = getState().firebase.auth.uid;

    list.map(doc => {
      if (doc.id === project.id) {
        firestore.collection('projects').doc(doc.id).update({
          title: project.title,
          category: project.category,
          price: project.price,
          content: project.content,
          photos: [...project.photos],
          tags: [...project.tags],
          upvoteCount: project.upvoteCount,
          votedOn: [...project.votedOn],
          comments: [...project.comments],
          partNumber: project.partNumber,
          make: project.make,
          model: project.model,
          year: project.year,
          brand: project.brand,
          shippingCost: project.shippingCost,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId,
          createdAt: new Date()
        }).then(() => {
          dispatch({ type: 'EDIT_PROJECT_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'EDIT_PROJECT_ERROR', err });
        });
      } 
    })

  }
};

export const updateProject = (comment, project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const list = getState().firestore.ordered.projects;
    const profile = getState().firebase.profile;

    list.map(doc => {
      if (doc.id === project) {
        firestore.collection('projects').doc(doc.id).update({
          comments: [...doc.comments, {
            comment,
            authorFirst: profile.firstName,
            authorLast: profile.lastName,
            createdAt: new Date()
          }]
        }).then(() => {
          dispatch({ type: 'UPDATE_PROJECT_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
        });
       }
      }
    );
  }
};

export const updateVote = (voter, project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firestore.ordered.projects;

    profile.map(doc => {
      if (!doc.votedOn.includes(voter) && (doc.id === project)) {
        firestore.collection('projects').doc(doc.id).update({
          votedOn: [...doc.votedOn, voter],
          upvoteCount: firestore.FieldValue.increment(1)
        }).then(() => {
          dispatch({ type: 'UPDATE_VOTE_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'UPDATE_VOTE_ERROR', err });
        });
       }
      }
    );
  };
};


export const deleteProject = (proj) => {
    return (dispatch, getState, { getFirestore }) => {
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
        }
      );
    };
  };