const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase)


const createNotification = (async notification => {
  const doc = await admin.firestore().collection('notifications').add(notification);
  return console.log('notification added', doc);
})

exports.projectCreated = functions.firestore.document('projects/{projectId}').onCreate(doc => {
    
    const project = doc.data();
    const notification = {
      content: "Added a new project",
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(async user => {
    
    const doc = await admin.firestore().collection('users')
      .doc(user.uid).get();
    const newUser = doc.data();
    const notification = {
      content: 'Joined the party',
      user: `${newUser.firstName} ${newUser.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return await createNotification(notification);
});