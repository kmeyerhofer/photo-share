import { Mongo } from 'meteor/mongo';
import adminSchema from './adminSchema.js';

const AdminDB = new Mongo.Collection('admin');
AdminDB.attachSchema(adminSchema);

export default AdminDB;
