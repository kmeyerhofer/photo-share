import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import '../imports/api/filesCollection.js'; // Needed for server side FilesColletion use

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    let dirLocation = `${process.env.PWD}/tmp`;
    console.log('received file');
    console.log(fileData);
    fileData.fullFileLocation = `${dirLocation}/${fileData.fileLocation}`;
    fse.outputFile(fileData.fullFileLocation, encryptedFile, {encoding: null}, function (err) {
      if (err) throw err;
    });
  },
});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    "url": `${folderURL}`,
  });
})
