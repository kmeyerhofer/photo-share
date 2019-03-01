import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import MongoComments from '../imports/api/mongoComments.js';

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    check(fileData, { url: String, fileLocation: String, fileName: String });
    check(encryptedFile, String);
    const dirLocation = `${process.env.PHOTO_SHARE_DIR}`;
    const fullFileLocation = `${dirLocation}/${fileData.fileLocation}`; // use this endpoint for file loading
    fse.outputFile(fullFileLocation, encryptedFile, { encoding: 'base64' }, function (err) {
      if (err) throw err;
    });
  },

  fileLoad(fullFileLoc) {
    check(fullFileLoc, String);
    const dirLocation = `${process.env.PHOTO_SHARE_DIR}`;
    const fullFilePath = `${dirLocation}/${fullFileLoc}`;
    const loadFile = Meteor.wrapAsync(fse.readFile);
    const result = loadFile(fullFilePath, { encoding: 'base64' });
    return result;
  },

  saveComments(id, comment) {
    check(id, String);
    check(comment, { author: String, comment: String });
    if (MongoComments.findOne({ _id: id }) === undefined) {
      try {
        MongoComments.insert({ _id: id, comments: [comment] });
      } catch (err) {
        throw err;
      }
    } else {
      try {
        MongoComments.update({ _id: id }, { $push: { comments: comment } });
      } catch (err) {
        throw err;
      }
    }
  },

});

Meteor.publish('files', function(folderURL) {
  check(folderURL, String);
  return MongoFiles.find({
    url: `${folderURL}`,
  });
});

Meteor.publish('comments', function(fileId) {
  check(fileId, String);
  return MongoComments.find({
    _id: fileId,
  });
});
