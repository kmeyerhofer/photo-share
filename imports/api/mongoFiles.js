import { Mongo } from 'meteor/mongo';

const MongoFiles = new Mongo.Collection('files');

export default MongoFiles;
