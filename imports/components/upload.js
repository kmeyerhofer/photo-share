import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import Files from '../api/filesCollection.js';


export default class Upload extends Component {
  generateUrl = () => shortid.generate();

  generateFileHash = (file) => {
    const messageDigest = forge.md.sha256.create();
    const fileSHA256 = messageDigest.update(file.name);
    return fileSHA256.digest().toHex().toString();
  }

  uploadFiles = (files, url) => {
    let dirLocation = '';
    Meteor.call('dirLocation', (error, result) => {
      if (error) {
        // ADD ERROR RESOLUTION
      } else {
        dirLocation = result;
        for (let i = 0; i < files.length; i += 1) {
          const fileName = this.generateFileHash(files[i]);
          Files.namingFunction = function() {
            return fileName;
          };
          const uploader = Files.insert({
            file: files[i],
            meta: {
              url,
              fileLocation: `${dirLocation}/${fileName}`,
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
              Meteor.call('moveFile', fileObj, (error, result) => {
                if (error) {
                  // ADD ERROR RESOLUTION
                }
              });
            }
          });
          uploader.start();
        }
      }
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    const url = this.generateUrl();
    const fileList = document.querySelector('#files').files;
    // Add fileList encryption step here
    this.uploadFiles(fileList, url);
  }

  render() {
    return (
      <form onSubmit={this.fileSubmitHandler}>
        <input type="file" id="files" multiple />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
