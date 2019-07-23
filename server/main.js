import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import MongoComments from '../imports/api/mongoComments.js';
import AdminDB from '../imports/api/adminDB.js';
import passwordHashGen from '../imports/server/passwordHash.js';
import retrieveUser from '../imports/server/retrieveUserAndValidate.js';
import keys from '../imports/server/settings/keys.js';
import jwt from 'jsonwebtoken';
import deleteFileAndFolder from '../imports/server/deleteFileAndFolder.js';

Meteor.startup(() => {
});

Meteor.methods({
  fileUpload(fileData, encryptedFile) {
    check(fileData, { url: String, fileLocation: String, fileName: String });
    check(encryptedFile, String);
    const dirLocation = `${process.env.PWD}`;
    const fullFileLocation = `${dirLocation}/tmp/${fileData.fileLocation}`; // use this endpoint for file loading
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
    if (comment.author.length === 0 && comment.comment.length === 0) {
      throw new Meteor.Error('Name and comment cannot be blank.');
    } else if (MongoComments.findOne({ _id: id }) === undefined) {
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

  loginAdmin(username, password) {
    check(username, String);
    check(password, String);
    return retrieveUser(username, password, keys.privatekey, (err, token) => {
      if(err){
        throw new Meteor.Error('Invalid password', 'passwords do not match');
      } else {
        return token;
      }
    });
  },

  retrieveFiles() {
    const files = MongoFiles.find({}, {fields: {fileName:1, fileLocation:1, url:1}}).fetch();
    const fileArray = [].concat.apply([], files)
    return fileArray;
  },

  async deleteFile(token, fileObj){
    // 1.) verify token, return if not valid
    // 2.) delete file from tmp folder using variables url as tmp folder directory and fileLocation as the file name
    // 3.) remove url folder from tmp if folder is empty
    // 4.) delete reference from mongoFiles collection
    // 5.) return a truthy value to the client.
    const verify = jwt.verify(token, keys.publickey);
    if (verify) {
      const deleted = await deleteFileAndFolder(fse, fileObj[1], fileObj[0], fileObj[2]);
      return deleted;
    } else {
      return false;
    }

  }

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
