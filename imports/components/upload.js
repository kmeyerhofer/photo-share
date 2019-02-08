import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
// import Files from '../api/filesCollection.js';
import { Redirect } from 'react-router-dom';
import { encrypt, promise } from '../helpers/encrypt.js'
import MongoFiles from '../api/mongoFiles.js';

export default class Upload extends Component {
  state = {
    uploaded: false,
    url: '',
  };

  generateUrl = () => shortid.generate();

  generateFileHash = (file) => {
    const messageDigest = forge.md.sha256.create();
    const fileSHA256 = messageDigest.update(file);
    return fileSHA256.digest().toHex().toString();
  }

  // moveFiles = (fileObj) => {
  //   Meteor.call('moveFile', fileObj, (error, result) => {
  //     if (error) {
  //       // ADD ERROR RESOLUTION
  //     }
  //   });
  // }

  // uploadFiles = (files) => {
  //   let self = this;
  //   let dirLocation = '';
  //   Meteor.call('dirLocation', (error, result) => {
  //     if (error) {
  //       // ADD ERROR RESOLUTION
  //     } else {
  //       dirLocation = result;
  //       for (let i = 0; i < files.length; i += 1) {
  //         const fileName = self.generateFileHash(files[i]);
  //         Files.namingFunction = function() {
  //           return fileName;
  //         };
  //         const uploader = Files.insert({  // config settings for uploader
  //           file: files[i],
  //           fileName: fileName,
  //           meta: {
  //             url: `${self.state.url}`,
  //             fileLocation: `${dirLocation}/${self.state.url}/${fileName}`,
  //             fileName,
  //           },
  //           // chunkSize: 'dynamic',
  //           // chunkSize: 1024 * 1024,
  //           type: 'img',
  //           streams: 'dynamic',
  //           isBase64: true,
  //           allowWebWorkers: false,
  //         }, false);
  //         uploader.on('data', function(data) {
  //           console.log('data call');
  //           console.log(data.length);
  //         });
  //         uploader.on('progress', function(progress, fileData) {
  //           console.log('progress fileData', progress, fileData);
  //         });
  //         uploader.on('error', function(error, fileData) {
  //           console.log('error fileData', fileData);
  //         });
  //         uploader.on('end', function(error, fileObj) {
  //           if (error) {
  //             // ADD ERROR RESOLUTION
  //           } else {
  //             self.moveFiles(fileObj);
  //             if (i === files.length - 1) { // Last file in the array
  //               self.setState({ uploaded: true });
  //             }
  //           }
  //         });
  //         const encryptFunc = function(data) {
  //           console.log('piped data ');
  //           console.log({data});
  //           var returned = encrypt(data);
  //           console.log('after encrypt is called ');
  //           console.log({returned});
  //           return returned;
  //         };
  //         uploader.pipe(encryptFunc).start();
  //       }
  //     }
  //   });
  // }

  uploadEncryptedFiles = (files) => {
    let self = this;
    // let dirLocation = '';
    // Meteor.call('dirLocation', (error, result) => {
    //   if (error) {
    //     // ADD ERROR RESOLUTION
    //   } else {
        // dirLocation = result;
        console.log(files);
    for (let i = 0; i < files.length; i += 1) {
      const fileName = self.generateFileHash(files[i]);
      let fileData = {
        url: `${self.state.url}`,
        fileLocation: `${self.state.url}/${fileName}`,
        fileName,
      }
      MongoFiles.insert({
        url: fileData.url,
        fileLocation: fileData.fileLocation,
        fileName: fileData.fileName,
      });
      let encryptedFile = encrypt(files[i]);
      Meteor.call('fileUpload', fileData, encryptedFile, (error, result) => {
        if (error) {
          // ADD ERROR RESOLUTION
        } else {
          console.log('file uploaded');
          if (i === files.length - 1) { // Last file in the array
            self.setState({ uploaded: true });
          }
        }
      });
    }
    // self.setState({ uploaded: true });
  // }
    // }
  }

  promiseFileLoader = async (fileList) => {
    let self = this;
    let fileListArr = [];
    for (let i = 0; i < fileList.length; i += 1) {
      fileListArr.push(promise(fileList[i]));
    }
    // console.log('promise array');
    // console.log(fileListArr);
    // console.log(fileListArr.length);
    Promise.all(fileListArr).then(values => {
      self.uploadEncryptedFiles(values);
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ url: this.generateUrl()});
    const fileList = document.querySelector('#files').files;
    const fileListArr = this.promiseFileLoader(fileList);
  }

  render() {
    if (this.state.uploaded) return <Redirect to={this.state.url} />;
    return (
      <form onSubmit={this.fileSubmitHandler}>
        <input type="file" id="files" multiple />
        <button type="submit">Upload</button>
      </form>
    );
  }
}
