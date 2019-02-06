import forge from 'node-forge';

export function promise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject('Error reading file');
    };
    reader.readAsDataURL(file);
  });
}

export function encrypt(file) {  // list of file objects
  if (file === undefined || file === null){
    return;
  }
  var key = forge.random.getBytesSync(16);
  var iv = forge.random.getBytesSync(16);
  return encryption(key, iv, file);
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
  cipher.update(forge.util.createBuffer(file));
  cipher.finish();
  return cipher.output.data;
}

//test cases

var assertEncryptIsExecuted = (actual, expected, testName) => {
  if (actual === expected) {
    console.log('this works');
  } else {
    return (testName + 'failed ' + 'got' + actual + 'but expected ' + expected);
  }
}
