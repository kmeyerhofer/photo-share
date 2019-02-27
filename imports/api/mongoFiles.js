import { Mongo } from 'meteor/mongo';
import schema from './schema';

const MongoFiles = new Mongo.Collection('files');

MongoFiles.allow({
  insert() {
    return true;
  },
});

MongoFiles.attachSchema(schema);

export default MongoFiles;
