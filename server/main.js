import { Meteor } from 'meteor/meteor';
// import forge from 'node-forge';
// import { EJSON } from 'meteor/ejson';
// import { MongoFiles } from '../imports/api/files.js';
import path from 'path';
import fs from 'fs';
import Files from '../imports/api/filesCollection.js';

// const generateFileLocation = (file) => {
//   let messageDigest = forge.md.sha256.create();
//   let fileSHA256 = messageDigest.update(file.name);
//   return 'tmp/' + fileSHA256.digest().toHex().toString();
// }

// const saveToFileSystem = (file, url) => {
//   let filePath = process.cwd().toString() + url;
//   fs.mkdir(filePath);
//   console.log(process.cwd());

// }

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
//   uploadFiles(files, url) {
// return generateFileLocation(files[0]);
// return EJSON.isBinary(files[0]);
// return EJSON.toJSONValue(files[0]).name;
// for (let i = 0; i < files.length; i += 1) {
//   Files.insert({
//     url,
//     fileLocation: this.generateFileLocation(files[i])
//   });
//   this.saveToFileSystem(files[i], url);
// }
//   },
  tmpLocation() {
    return `${process.env.PWD}`;
  },

// WRITE FILE SAVE FUNCTION HERE!
  dirLocation(url) {
    let tmp = `${process.env.PWD}/tmp`; //;`../${__dirname}/tmp`
    let newDir = `${tmp}/${url}`;
    fs.mkdirSync(newDir, (err) => {
      if (err) throw err;
    });
    return newDir;
  }
});
