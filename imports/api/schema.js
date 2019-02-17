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
  'salt': {
    type: String,
  },
  'iv': {
    type: String,
  }
});

export default schema;
