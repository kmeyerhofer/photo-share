import forge from 'node-forge';

function encryption(key, iv, file) {
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(file));
  cipher.finish();
  return cipher.output;
}

export default function encrypt(file, password, salt, iv) { // list of file objects
  if (file === undefined || file === null) {
    return;
  }
  if (password === undefined || password === null) {
    return;
  }
  const key = forge.pkcs5.pbkdf2(password, salt, 16, 16);

  const encryptionFile = encryption(key, iv, file); // aka cipher.output
  return forge.util.encode64(encryptionFile.getBytes());
}

// test cases

const assertEncryptIsExecuted = (actual, expected, testName) => {
  if (actual === expected) {
    return ('this works');
  }
  return (`${testName}failed got ${actual} but expected ${expected}`);
};
