const { readFileSync } = require('fs');
const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} = require('@firebase/rules-unit-testing');
const { doc, setDoc } = require('firebase/firestore');

test('Security rule should deny write to any document', async () => {

  const testEnv = await initializeTestEnvironment({
    projectId: 'grpc-error',
    firestore: {
      host: 'localhost',
      port: 8080,
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });

  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.com' });
  const db = bob.firestore();
  const docRef = doc(db, 'users/bob');

  await assertFails(setDoc(docRef, { comment: 'Hello world' }));
});
