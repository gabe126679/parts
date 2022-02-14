const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

const updateNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .update(notification)
      .then(doc => console.log('notification added', doc));
  });


exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
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
  .onUpdate(async (snap, context) => {
    const newValues = snap.after.data();
    const previousValues = snap.before.data();

    if (previousValues.viewedBy !== newValues.viewedBy) {
        const snapshot = await db.collection('notifications').where('viewedBy', '==', )
    }

    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      viewedBy: []
    }

    return createNotification(notification);

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