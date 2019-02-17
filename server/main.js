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
    fileData.fullFileLocation = `${dirLocation}/${fileData.fileLocation}`; // use this endpoint for file loading
    fse.outputFile(fileData.fullFileLocation, encryptedFile, {encoding: 'base64'}, function (err) {
      if (err) throw err;
    });
  },

  fileLoad(fullFileLoc) {
    let dirLocation = `${process.env.PWD}/tmp`;
    let fullFilePath = dirLocation + '/' + fullFileLoc;
    let loadFile = Meteor.wrapAsync(fse.readFile);
    let result = loadFile(fullFilePath, {encoding: 'base64'});
    return result;
    // fse.readFile(fullFilePath, 'utf-8').then(contents => {
    //   data = contents;
    // }).catch(err => console.log(err));
  },
});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    "url": `${folderURL}`,
  });
})
