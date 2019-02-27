// Async testing isn't working, utilize promises in future tests

// import { expect } from 'chai';
// import fse from 'fs-extra';
// import { generateURL, generateFileHash, encode64 } from '../../imports/helpers/fileUtilities.js';
//
// const url = generateURL();
// const fileName = generateFileHash('Here is a random string to generate a file hash from');
// const file = encode64('A base64 encoded string used as a file for testing purposes.');
// const fileData = {
//   url,
//   fileLocation: `${url}/${fileName}`,
//   fileName,
// };

// if (Meteor.isClient) {
//   describe('File system', function () {
//     it('creates and moves a file into tmp/', function () {
//       Meteor.call('fileUpload', fileData, file, (error) => {
//         if (error) {
//           return false;
//         }
//         return false;
//       });
//     });
//   });
// }

// if (Meteor.isServer) {
//   describe('File system', function () {
//     it('checks file is located in folder', function () {
//       const fullFileLocation = `${process.env.PWD}/tmp/${fileData.fileLocation}`;
//       const fileExists = fse.existsSync(fullFileLocation);
//       expect(fileExists).to.equal(true);
//     });
//   });
// }
