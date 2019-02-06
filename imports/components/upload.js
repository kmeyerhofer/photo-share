import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import Files from '../api/filesCollection.js';
import { Redirect } from 'react-router-dom';
import { encrypt, promise } from '../helpers/encrypt.js'

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

  moveFiles = (fileObj) => {
    Meteor.call('moveFile', fileObj, (error, result) => {
      if (error) {
        // ADD ERROR RESOLUTION
      }
    });
  }

  uploadFiles = (files) => {
    let self = this;
    let dirLocation = '';
    Meteor.call('dirLocation', (error, result) => {
      if (error) {
        // ADD ERROR RESOLUTION
      } else {
        dirLocation = result;
        for (let i = 0; i < files.length; i += 1) {
          const fileName = self.generateFileHash(files[i]);
          Files.namingFunction = function() {
            return fileName;
          };
          const uploader = Files.insert({  // config settings for uploader
            file: files[i],
            fileName: fileName,
            meta: {
              url: `${self.state.url}`,
              fileLocation: `${dirLocation}/${self.state.url}/${fileName}`,
              fileName,
            },
            chunkSize: 'dynamic',
            streams: 'dynamic',
            isBase64: true,
            type: 'image/png',
          }, false);
          uploader.on('end', function(error, fileObj) {
            if (error) {
              // ADD ERROR RESOLUTION
            } else {
              self.moveFiles(fileObj);
              // self.setState({ uploaded: true });
            }
          });
          uploader.on('error', function(error, fileData) {
            if (error) {
            }
          });
          uploader.on('start', function(error, fileData) {
            if (error) {
            }
          });
          const encryptFunc = function(data) {
            return encrypt(data);
          };
          console.log(files[i]);
          uploader.pipe(encryptFunc).start();
        }
        self.setState({ uploaded: true });
      }
    });
  }

  promiseFileLoader = async (fileList) => {
    let self = this;
    let fileListArr = [];
    for (let i = 0; i < fileList.length; i += 1) {
      fileListArr.push(promise(fileList[i]));
    }
    console.log('promise array');
    console.log(fileListArr);
    console.log(fileListArr.length);
    Promise.all(fileListArr).then(values => {
      self.uploadFiles(values);
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
