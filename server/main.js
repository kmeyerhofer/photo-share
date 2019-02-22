import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import MongoComments from '../imports/api/mongoComments.js';

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

  saveComments(id, comment) {
    try {
      MongoComments.update({_id: id}, {$push: {comments: comment}});
    } catch(error) {
      console.log(error);
    }

  },

  addComments(id, comment) {  // done
    if(MongoComments.findOne({_id: id}) === undefined){
      try {
        MongoComments.insert({ _id: id, comments: comment});
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  },

});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    url: `${folderURL}`,
  });
});

Meteor.publish('comments', function(fileId) {
  return MongoComments.find({
    _id: fileId,
  });
});
