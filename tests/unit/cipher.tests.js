import { expect } from 'chai';
import { randomBytes, encode64 } from '../../imports/helpers/fileUtilities.js';
import decrypt from '../../imports/helpers/decrypt.js';
import encrypt from '../../imports/helpers/encrypt.js';

if (Meteor.isServer) {
  describe('cipher testing', function () {
    const password = 'ThisisthePassW0RDthatWeareTestingWith';
    const iv = randomBytes(16);
    const salt = randomBytes(128);
    const string = 'Lets try to encrypt this string and see what it outputs.';

    it('encrypts a string', function () {
      const encryptedString = encrypt(string, password, salt, iv);
      expect(encryptedString).to.not.equal(string);
    });

    it('decrypts a string', function () {
      const encryptedString = encrypt(string, password, salt, iv);
      expect(encryptedString).to.not.equal(string);
      const decryptedString = decrypt(encryptedString, password, encode64(salt), encode64(iv));
      expect(decryptedString).to.not.equal(encryptedString);
      expect(decryptedString).to.equal(string);
    });
  });
}
