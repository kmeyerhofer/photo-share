import forge from 'node-forge';


export function encrypt(fileList, password) {  // list of file objects
  if (fileList === undefined || fileList === null){
    return;
  }
  if (password === undefined || password === null){
    return;
  }
  // var key = forge.random.getBytesSync(16);
  var salt = forge.random.getBytesSync(16);
  var key = forge.pkcs5.pbkdf2(password, salt, 8, 16);
  var iv = forge.random.getBytesSync(16); // might need to store iv for decryption -> TODO figure this out

  var base64File;
  var encryptedFileList = [];
  for (var i = 0; i < fileList.length; i++){
    var encryptBase64File = fileToBase64(fileList[i], function(e) {
      base64File = e.target.result;

      var encrypted = encryption(key, iv, base64File);
      // console.log(encrypted);
      encryptedFileList.push(encrypted);
      console.log(typeof encrypted.data); // encrypted.data is represented as a string
    });
  }
  // console.log(encryptedFileList);
  return encryptedFileList;
}

// function fileToBase64(fileObj, onLoadCallBack) {
//   var reader = new FileReader();
//   reader.readAsDataURL(fileObj);
//   reader.onload = onLoadCallBack;
//   reader.onerror = function(error) {
//     console.log('Error', error);
//   }
// }

function encryption(key, iv, file) {
  var cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({iv:iv});
  cipher.update(forge.util.createBuffer(file)); // createBuffer(file, String raw)
  cipher.finish();
  return cipher.output
}

//test cases

var assertEncryptIsExecuted = (actual, expected, testName) => {
  if (actual === expected) {
    console.log('this works');
  } else {
    return (testName + 'failed ' + 'got' + actual + 'but expected ' + expected);
  }
}
