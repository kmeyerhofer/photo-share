import { Meteor } from 'meteor/meteor';
import fse from 'fs-extra';
import MongoFiles from '../imports/api/mongoFiles.js';
import '../imports/api/filesCollection.js'; // Needed for server side FilesColletion use

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  dirLocation() {
    return `${process.env.PWD}/tmp`;
  },
  moveFile(fileObj) {
    const fileSaveRoot = `${fileObj._downloadRoute}`;
    const fileSource = `${fileObj.path}`;
    const fileDestination = `${fileSaveRoot}/${fileObj.meta.url}/${fileObj.meta.fileName}`;
    fse.move(fileSource, fileDestination, (err) => {
      if (err) {
        // ADD ERROR RESOLUTION
      }
    });
  },
});

Meteor.publish('files', function(folderURL) {
  return MongoFiles.find({
    "meta.url": `${folderURL}`,
  });
})
