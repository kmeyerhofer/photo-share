import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import Files from '../api/filesCollection.js';
import { Redirect } from 'react-router-dom';

export default class Upload extends Component {
  state = {
    uploaded: false,
    url: '',
  };

  generateUrl = () => shortid.generate();

  generateFileHash = (file) => {
    const messageDigest = forge.md.sha256.create();
    const fileSHA256 = messageDigest.update(file.name);
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
          const uploader = Files.insert({
            file: files[i],
            meta: {
              url: `${self.state.url}`,
              fileLocation: `${dirLocation}/${self.state.url}/${fileName}`,
              fileName,
            },
            chunkSize: 'dynamic',
            streams: 'dynamic',
            allowWebWorkers: false,
          }, false);
          uploader.on('end', function(error, fileObj) {
            if (error) {
              // ADD ERROR RESOLUTION
            } else {
              self.moveFiles(fileObj);
              self.setState({ uploaded: true });
            }
          });
          uploader.start();
        }
      }
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ url: this.generateUrl()});
    const fileList = document.querySelector('#files').files;
    // Add fileList encryption step here
    this.uploadFiles(fileList);
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
