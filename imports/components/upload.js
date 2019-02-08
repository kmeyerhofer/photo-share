import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import { Redirect } from 'react-router-dom';
import encrypt from '../helpers/encrypt.js';
import promise from '../helpers/promise.js';
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

  uploadEncryptedFiles = (fileInfo, files) => {
    let self = this;
    for (let i = 0; i < files.length; i += 1) {
      const fileName = self.generateFileHash(files[i]);
      let fileData = {
        url: `${self.state.url}`,
        fileLocation: `${self.state.url}/${fileName}`,
        fileName,
      };
      // console.log(fileData);
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
          // console.log('file uploaded');
          if (i === files.length - 1) { // Last file in the array
            self.setState({ uploaded: true });
          }
        }
      });
    }
  }

  promiseFileLoader = async (fileList) => {
    let self = this;
    let fileListArr = [];
    for (let i = 0; i < fileList.length; i += 1) {
      fileListArr.push(promise(fileList[i]));
    }
    Promise.all(fileListArr).then(values => {
      self.uploadEncryptedFiles(fileList, values);
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ url: this.generateUrl()});
    const fileList = document.querySelector('#files').files;
    this.promiseFileLoader(fileList);
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
