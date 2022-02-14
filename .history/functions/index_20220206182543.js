const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const { arrayUnion } = require('firebase/firestore');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

const updateNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .update(notification)
      .then(doc => console.log('notification updated', doc));
  });


exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    console.log(project);
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      viewedBy: []
    }

    return createNotification(notification);

});

exports.notificationUpdated = functions.firestore
  .document('notifications/{notificationId}')
  .onUpdate(async item => {

    const doc = await firestore.collection("notifications").doc(item.id).get();
        
    const notification = {
        content: item.content,
        ...doc.data()
    }


    return updateNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp(), 
          viewedBy: []
        };

        return createNotification(notification);

      });
});