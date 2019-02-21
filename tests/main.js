import assert from 'assert';

describe('photo-share', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'photo-share');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});


// test cases from encrypt.js

// const assertEncryptIsExecuted = (actual, expected, testName) => {
//   if (actual === expected) {
//     return ('this works');
//   }
//   return (`${testName}failed got ${actual} but expected ${expected}`);
// };
