export const callWithPromise = (method, params) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        resolve(result);
      }
    });
  });
}
