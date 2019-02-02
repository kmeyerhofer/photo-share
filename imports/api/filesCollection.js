import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';
import { MongoFiles } from './mongoFiles.js';

const filesSchema = new SimpleSchema({
  // fileName: {
  //   type: String,
  // },
  meta: {
    type: Object,
  },
  'meta.url': {
    type: String,
  },
  'meta.fileLocation': {
    type: String,
  },
  'meta.fileName': {
    type: String,
  },
});

// Meteor.call('dirLocation', url, (error, result) => {
//   if (error) {
//     console.log('error: ' + error);//REMOVE
//   } else {
//     console.log('result: '+ result);//REMPVE
//     dirLocation = result;

// MAYBE JOIN THIS FILE INTO COMPONENTS/UPLOAD.JS TO UTILIZE url VARIABLE IN FOLDER UTILIZATION
const Files = new FilesCollection({
  //storagePath: `${process.env.PWD}`,//path.normalize(path.resolve(__dirname) + '../../tmp'),
  // DEFAULT STORAGE PATH IS /home/kurt/coding/photo-share/.meteor/local/build/programs/server/assets/app/uploads/files
  // storagePath: function
  // downloadRoute: '/tmp',
  collection: MongoFiles,
  collectionName: 'files',

  // schema: mySchema,

  // permissions: 0700,
  // allowClientCode: false,
  // onBeforeUpload(file) {

  // },
});

// Files.collection.attachSchema(mySchema);
Files.collection.attachSchema(filesSchema);

export default Files;
