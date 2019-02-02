import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { EJSON } from 'meteor/ejson';
import forge from 'node-forge';
import shortid from 'shortid';
import path from 'path';
import Files from '../api/filesCollection';


export default class Upload extends Component {
  generateUrl = () => shortid.generate();

  generateFileHash = (file) => {
    const messageDigest = forge.md.sha256.create();
    const fileSHA256 = messageDigest.update(file.name);
    return fileSHA256.digest().toHex().toString();
  }

  generateFileLocation = (fileName, url) => {
    return Meteor.call('fileLocation', fileName, url, (error, result) => {
      if (error) {
        console.log('error: ' + error);//REMOVE
        return 'error';
      } else {
        console.log('result: '+ result);//REMPVE
        return result;
      }
    });
  }

  uploadFiles = (files, url) => {
    let dirLocation = '';
    Meteor.call('dirLocation', url, (error, result) => {
      if (error) {
        console.log('error: ' + error);//REMOVE
      } else {
        console.log('result: '+ result);//REMPVE
        dirLocation = result;
        // Files.storagePath = function() {
        //   return `${dirLocation}`;
        // };//`${dirLocation}`;
        for (let i = 0; i < files.length; i += 1) {
          const fileName = this.generateFileHash(files[i]);
          // let fileLocation = this.generateFileLocation(fileName, url);
          // Files.downloadRoute = `${dirLocation}/`;
          Files.namingFunction = function() {
            return fileName;
          };
          console.log(`fileLocation: ${dirLocation}, fileName: ${fileName}`);
          // console.log(`storagePath: ${Files.storagePath}/`);
          console.log(`file: ${files[i]}`);
          Meteor.call('tmpLocation', (error, result) => {
            console.log(result);
          });
          const uploader = Files.insert({
            file: files[i],
            // fileId: this.generateFileLocation(files[i]),
            meta: {
              url,
              fileLocation: `${dirLocation}/${fileName}`,
              fileName,
            },
            // meta: {
            //   url,
            //   fileLocation: 'tmp/' + this.generateFileLocation(files[i]),
            // },
            chunkSize: 'dynamic',
            streams: 'dynamic',
            allowWebWorkers: false,

          }, false);
          uploader.on('uploaded', function(error, fileObj){
            if (!error) {
              console.log('File ' + fileObj.name + ' successfully uploaded');
              console.log('StoragePath: ' + Files.storagePath);
            }
          });
          uploader.start();
        }
      }
    });

    // let fileBinArr = [];
    // for (let i = 0; i < files.length; i += 1) {
    //   fileBinArr.push(EJSON.newBinary(files[i]));
    // }
    // Meteor.call('uploadFiles', fileBinArr, url, (error, result) => {
    //   if (error) {
    //     console.log('error: ' + error);
    //   } else {
    //     console.log('result: '+ result);
    //     return result;
    //   }
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
