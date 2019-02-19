import forge from 'node-forge';

export default function encrypt(file, password, salt, iv) {  // list of file objects
  if (file === undefined || file === null){
    return;
  }
  if (password === undefined || password === null) {
    return;
  }
  var key = forge.pkcs5.pbkdf2(password, salt, 16, 16);

  let encryptionFile = encryption(key, iv, file); // aka cipher.output
  return forge.util.encode64(encryptionFile.getBytes());
}

function encryption(key, iv, file) {
  var cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({iv:iv});
  cipher.update(forge.util.createBuffer(file));
  cipher.finish();
  return cipher.output;
}

//test cases

var assertEncryptIsExecuted = (actual, expected, testName) => {
  if (actual === expected) {
    console.log('this works');
  } else {
    return (testName + 'failed ' + 'got' + actual + 'but expected ' + expected);
  }
}
