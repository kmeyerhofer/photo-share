import forge from 'node-forge';

export default function encrypt(file) {  // list of file objects
  if (file === undefined || file === null){
    return;
  }
  var key = forge.random.getBytesSync(16);
  var iv = forge.random.getBytesSync(16);
  let encryptionFile = encryption(key, iv, file);
  return forge.util.encode64(encryptionFile.data);
}

function encryption(key, iv, file) {
  var cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({iv:iv});
  cipher.update(forge.util.createBuffer(file/*, 'raw'*/));
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
