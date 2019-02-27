import { Meteor } from 'meteor/meteor';

const callWithPromise = (method, params) => new Promise((resolve) => {
  Meteor.call(method, params, (err, result) => {
    if (err) {
      // console.log(err);
    } else {
      resolve(result);
    }
  });
});

export default callWithPromise;
