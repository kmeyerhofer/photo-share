import SimpleSchema from 'simpl-schema';

const adminSchema = new SimpleSchema({
  _id: String,
  username: String,
  password: String,
});

export default adminSchema;
