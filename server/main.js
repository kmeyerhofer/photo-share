import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    const dirLocation = `${process.env.PWD}/tmp`;
    fileData.fullFileLocation = `${dirLocation}/${fileData.fileLocation}`; // use this endpoint for file loading
    fse.outputFile(fileData.fullFileLocation, encryptedFile, { encoding: 'base64' }, function (err) {
      if (err) throw err;
    });
  },

  fileLoad(fullFileLoc) {
    const dirLocation = `${process.env.PWD}/tmp`;
    const fullFilePath = dirLocation + '/' + fullFileLoc;
    const loadFile = Meteor.wrapAsync(fse.readFile);
    const result = loadFile(fullFilePath, { encoding: 'base64' });
    return result;
  },
});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    url: `${folderURL}`,
  });
});
