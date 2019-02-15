import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    const dirLocation = `${process.env.PWD}/tmp`;
    fileData.fullFileLocation = `${dirLocation}/${fileData.fileLocation}`;
    fse.outputFile(fileData.fullFileLocation, encryptedFile, { encoding: null }, function (err) {
      if (err) throw err;
    });
  },
});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    url: `${folderURL}`,
  });
});
