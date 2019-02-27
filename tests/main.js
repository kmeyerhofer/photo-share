import assert from 'assert';
// import './upload.tests.js'; // Not yet implemented correctly
import './unit/passwordEncrypt.tests.js';
import './unit/passwordDecrypt.tests.js';
import './unit/error.tests.js';
import './unit/app.tests.js';
import './unit/loading.tests.js';
import './unit/cipher.tests.js';
import './integration/fileMoving.tests.js';

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
