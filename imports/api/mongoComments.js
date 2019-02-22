import { Mongo } from 'meteor/mongo';
import commentSchema from './commentSchema';

const MongoComments = new Mongo.Collection('comments');

MongoComments.attachSchema(commentSchema);

export default MongoComments;
