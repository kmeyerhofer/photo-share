import forge from 'node-forge';

export default function decrypt(base64EncryptedFile, password, encodedSalt, encodedIV) {
  const iv = forge.util.decode64(encodedIV);
  const salt = forge.util.decode64(encodedSalt);
  const key = forge.pkcs5.pbkdf2(password, salt, 16, 16);
  const decoded = forge.util.decode64(base64EncryptedFile);
  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(decoded));
  decipher.finish();
  return decipher.output.getBytes();
}
