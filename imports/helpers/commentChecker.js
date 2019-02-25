import MongoComments from '../api/mongoComments.js';

export default function checkComments(id) {
    if ( MongoComments.findOne({_id: id}) === undefined) {
      return true;
    } else {
      return false;
    }
}
