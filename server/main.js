import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    check(fileData, { url: String, fileLocation: String, fileName: String });
    check(encryptedFile, String);
    const dirLocation = `${process.env.PWD}/tmp`;
    const fullFileLocation = `${dirLocation}/${fileData.fileLocation}`; // use this endpoint for file loading
    fse.outputFile(fullFileLocation, encryptedFile, { encoding: 'base64' }, function (err) {
      if (err) throw err;
    });
  },

  fileLoad(fullFileLoc) {
    check(fullFileLoc, String);
    const dirLocation = `${process.env.PWD}/tmp`;
    const fullFilePath = `${dirLocation}/${fullFileLoc}`;
    const loadFile = Meteor.wrapAsync(fse.readFile);
    const result = loadFile(fullFilePath, { encoding: 'base64' });
    return result;
  },
});

Meteor.publish('files', function(folderURL) {
  check(folderURL, String);
  return MongoFiles.find({
    url: `${folderURL}`,
  });
});
