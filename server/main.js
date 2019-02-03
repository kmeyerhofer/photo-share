import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import Files from '../imports/api/filesCollection.js'; // Needed for server side FilesColletion use

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  dirLocation(url) {
    const tmp = `${process.env.PWD}/tmp`;
    const newDir = `${tmp}/${url}`;
    fs.mkdirSync(newDir, (err) => {
      if (err) throw err;
    });
    return newDir;
  }
});
