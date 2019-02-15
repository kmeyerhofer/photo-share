import forge from 'node-forge';

export default function decrypt(base64EncryptedFile, password, encodedSalt, encodedIV){

  // decode: salt, iv, and base64EncryptedFile

  var iv = forge.util.decode64(encodedIV);
  var salt = forge.util.decode64(encodedSalt);
  var key = forge.pkcs5.pbkdf2(password, salt, 16, 16);
  var decoded = forge.util.decode64(base64EncryptedFile);

  var decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({iv:iv});
  decipher.update(forge.util.createBuffer(decoded));
  decipher.finish();

  console.log('decrypted data:');
  console.log(decipher.output.getBytes());

  // return decipher.output.getBytes()

}
