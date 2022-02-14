
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createNotification = (async notification => {
  const doc = await _firestore().collection('notifications').add(notification);
  return console.log('notification added', doc);
});

export const projectCreated = firestore.document('projects/{projectId}').onCreate(doc => {
    
    const project = doc.data();
    const notification = {
      content: "Added a new project",
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: _firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

export const userJoined = auth.user()
  .onCreate(async user => {
    
    const doc = await _firestore().collection('users')
      .doc(user.uid).get()
    const newUser = doc.data();
    const notification = {
      content: 'Joined the Club!',
      user: `${newUser.firstName} ${newUser.lastName}`,
      time: _firestore.FieldValue.serverTimestamp()
    };
    return await createNotification(notification);
});