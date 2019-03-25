if (process.env.NODE_ENV === 'test') {
  throw new Error("Tried to use un-mocked firebase in a test. Add jest.mock('./firebase') to the test");
}
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

export default firebase;
