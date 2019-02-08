import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({
  'url': {
    type: String,
  },
  'fileLocation': {
    type: String,
  },
  'fileName': {
    type: String,
  },
  'iv': {
    type: String,
    optional: true, // remove optional in future
  },
});

export default schema;
