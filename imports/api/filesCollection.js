import { FilesCollection } from 'meteor/ostrio:files';
import MongoFiles from './mongoFiles.js';
import schema from './schema';

const Files = new FilesCollection({
  storagePath: `${process.env.PWD}/tmp`,
  downloadRoute: `${process.env.PWD}/tmp`,
  collection: MongoFiles,
  collectionName: 'files',
});

Files.collection.attachSchema(schema);

export default Files;
