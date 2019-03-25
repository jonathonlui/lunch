import { getLunches, addSuggestion } from './database';
import firebase from './firebase';

jest.mock('./firebase', () => {
  const createMockCollection = (docs: any[] = []) => {
    const add = jest.fn(async (data: any) => {});
    const get = jest.fn(async () => ({
      docs: docs.map(doc => ({
        id: doc.id,
        data: () => doc,
      })),
    }));
    const where = jest.fn(() => ({ get }));
    return { add, get, where };
  };

  const collections = {
    lunches: createMockCollection([
      { id: 'mock-lunch-1' },
      { id: 'mock-lunch-2' },
    ]),
    suggestions: createMockCollection(),
  }
  const collection = jest.fn((name: 'lunches' | 'suggestions') => collections[name]);
  const firestore: {
    (): any,
    [mockKey: string]: any,
  } = jest.fn(() => ({ collection }));
  firestore.FieldValue = {
    serverTimestamp: jest.fn(() => 'mock-timestamp'),
  }
  return { firestore }
});


describe('getLunches', () => {
  it('returns a list of Lunch objects', async () => {
    expect(await getLunches()).toEqual([
      {
        id: 'mock-lunch-1',
      },
      {
        id: 'mock-lunch-2',
      },
    ])
  });
});


describe('addSuggestion', () => {
  it('inserts new doc in firestore', async () => {
    const suggestion = {};
    await addSuggestion(suggestion);
    expect(firebase.firestore().collection('suggestions').add).toHaveBeenCalledWith({
      ...suggestion,
      createdAt: 'mock-timestamp',
    });
  });
});
