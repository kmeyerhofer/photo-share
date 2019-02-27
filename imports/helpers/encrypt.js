import forge from 'node-forge';

function encryption(key, iv, file) {
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(file));
  cipher.finish();
  return cipher.output;
}

export default function encrypt(file, password, salt, iv) {
  if (file === undefined || file === null) {
    return false;
  }
  if (password === undefined || password === null) {
    return false;
  }
  const key = forge.pkcs5.pbkdf2(password, salt, 16, 16);
  const encryptionFile = encryption(key, iv, file); // aka cipher.output
  const encodedBase64File = forge.util.encode64(encryptionFile.getBytes());
  return encodedBase64File;
}
