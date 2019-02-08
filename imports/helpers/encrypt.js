import forge from 'node-forge';

function decrypt(file, encryptedFile, key, iv) {
  var decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({iv: iv});
  decipher.update(encryptedFile);
  var result = decipher.finish();
  // console.log('result: ', result);
  // console.log('decipher.output: ', decipher.output);
  // console.log('file === encryptedFile: ', (file === encryptedFile));
  // console.log('encryptedFile === decipher.output: ', (encryptedFile === decipher.output.data));
  // console.log('file === decipher.output.data: ', (file === decipher.output.data));
  // console.log(file);
  // console.log(encryptedFile.data);
}

export function promise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject('Error reading file');
    };
    // reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file);
  });
}

export function encrypt(file) {  // list of file objects
  if (file === undefined || file === null){
    return;
  }
  var key = forge.random.getBytesSync(16);
  var iv = forge.random.getBytesSync(16);
  let encryptionFile = encryption(key, iv, file);
  // console.log(encryptionFile);
  // console.log(encryption(key, iv, file));
  // console.log((encryptionFile.data === encryption(key,iv,file).data));
  // return encryption(key, iv, file);
  // console.log(encryptionFile);
  // console.log(encryptionFile.data.toString());
  // encryptionFile.byteLength = encryptionFile._constructedStringLength;
  // console.log('cSL', encryptionFile._constructedStringLength);
  // console.log('byteLength',encryptionFile.byteLength);
  // console.log('encryptionFile base64 encoded');
  // console.log(forge.util.binary.base64.encode(encryptionFile));
  // decrypt(file, encryptionFile, key, iv);
  // return forge.util.binary.base64.encode(encryption(key,iv,file).data);
  // return forge.util.binary.base64.encode(encryptionFile.data);
  return forge.util.encode64(encryptionFile.data);
}

function fileToBase64(fileObj, onLoadCallBack) {
  var reader = new FileReader();
  reader.readAsDataURL(fileObj);
  reader.onload = onLoadCallBack;
  reader.onerror = function(error) {
    console.log('Error', error);
  }
}

function encryption(key, iv, file) {
  var cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({iv:iv});
  cipher.update(forge.util.createBuffer(file, 'raw'));
  cipher.finish();
  // console.log(cipher);
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
