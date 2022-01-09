const { readFileSync } = require('fs');
const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} = require('@firebase/rules-unit-testing');
const { doc, setDoc } = require('firebase/firestore');

describe('Security rules', () => {
  let testEnv;
  let db;

  test('should deny writes to unauthorized collections', async () => {
    const docRef = doc(db, 'privateCollection/privateDoc');
    await assertFails(setDoc(docRef, { comment: 'I should be denied' }));
  });

  test('should allow writes to public collections', async () => {
    const docRef = doc(db, 'publicCollection/publicDoc');
    await assertSucceeds(setDoc(docRef, { comment: 'I should be allowed' }));
  });

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'grpc-error',
      firestore: {
        host: 'localhost',
        port: 8080,
        rules: readFileSync('firestore.rules', 'utf8'),
      },
    });

    db = testEnv.unauthenticatedContext().firestore();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });
});
