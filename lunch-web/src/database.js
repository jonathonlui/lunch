import firebase, { db } from './firebase';


const debug = require('debug')('lunch:database');


export async function getLunches() {
  debug('getLunches');
  const { docs } = await db
    .collection('lunches')
    .where('meals', '>', []) // Only get lunches that have meals
    .get();
  return docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


export function addSuggestion(data) {
  debug('addSuggestion', data);
  return db
    .collection('suggestions')
    .add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
