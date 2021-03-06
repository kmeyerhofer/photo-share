import SimpleSchema from 'simpl-schema';

const commentSchema = new SimpleSchema({
  _id: String,
  comments: {
    type: Array,
  },
  'comments.$': {
    type: Object,
  },
  'comments.$.author': {
    type: String,
    optional: true,
  },
  'comments.$.comment': {
    type: String,
  },
});


export default commentSchema;
