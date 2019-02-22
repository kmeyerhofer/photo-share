import assert from 'assert';
// import './upload.tests.js'; // Not yet implemented correctly
import './passwordEncrypt.tests.js';
import './passwordDecrypt.tests.js';
import './error.tests.js';
import './app.tests.js';
import './loading.tests.js';
import './cipher.tests.js';
import './fileMoving.tests.js';

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
