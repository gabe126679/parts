import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDrAZI84iCHJOBBTqiyasNNgUzUOu5LxhU",
  authDomain: "motorcycle-parts-e29b5.firebaseapp.com",
  projectId: "motorcycle-parts-e29b5",
  storageBucket: "motorcycle-parts-e29b5.appspot.com",
  messagingSenderId: "860141495742",
  appId: "1:860141495742:web:629139394fe8e0d89ac5ef"
};

const app = initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default app;