import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({
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

export default schema;
