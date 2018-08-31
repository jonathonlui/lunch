import firebase from 'firebase/app';
import 'firebase/firestore';


const {
  REACT_APP_FIREBASE_PROJECT_ID = 'lunch-9f1b3',
  REACT_APP_FIREBASE_API_KEY = 'AIzaSyAvMg20cdgtpXBEt-UhBE_HZlya-s16b4w',
} = process.env;

firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: `${REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
});


const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export { db };


export default firebase;
