import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import '../imports/api/filesCollection.js'; // Needed for server side FilesColletion use

Meteor.startup(() => {
  if(Meteor.is_server) {
    MongoFiles.allow({
      'insert': function(userId) {
        return true;
      },
    });
  }
});

Meteor.methods({
  // dirLocation() {
  //   return `${process.env.PWD}/tmp`;
  // },
  // moveFile(fileObj) {
  //   const fileSaveRoot = `${fileObj._downloadRoute}`;
  //   const fileSource = `${fileObj.path}`;
  //   const fileDestination = `${fileSaveRoot}/${fileObj.meta.url}/${fileObj.meta.fileName}`;
  //   fse.move(fileSource, fileDestination, (err) => {
  //     if (err) {
  //       // ADD ERROR RESOLUTION
  //     }
  //   });
  // },
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
    "meta.url": `${folderURL}`,
  });
})
