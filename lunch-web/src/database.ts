import firebase from './firebase';


const debug = require('debug/dist/debug')('lunch:database');


export async function getLunches() {
  debug('getLunches');
  const { docs } = await firebase.firestore()
    .collection('lunches')
    .where('meals', '>', []) // Only get lunches that have meals
    .get();
  return docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


export function addSuggestion(data?: any) {
  debug('addSuggestion', data);
  return firebase.firestore()
    .collection('suggestions')
    .add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
