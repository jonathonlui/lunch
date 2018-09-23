import { db } from './firebase';


export async function putLunch() {
  throw new Error('Not implemented');
}


export async function getLunches() {
  const { docs } = await db
    .collection('lunches')
    .where('meals', '>', []) // Only get lunches that have meals
    .get();
  return docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
