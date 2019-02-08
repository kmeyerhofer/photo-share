import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import Files from '../api/filesCollection.js';
import { Redirect } from 'react-router-dom';
import { encrypt } from '../helpers/encrypt.js'

export default class Upload extends Component {
  state = {
    uploaded: false,
    url: '',
    password: "",
    error: '',
  };

  handlePasswordValidate = () => {
    let formIsValid = true;
    let err = '';
    console.log(this.state.password);
    if (this.state.password === "") {
      formIsValid = false;
      alert("password cannot be blank");
    }
    if (this.state.password.length < 5 ) {
      formIsValid = false;
      alert("password needs to be longer than 5 characters");
    }
    this.setState({error: err})
    return formIsValid;
  }

  generateUrl = () => shortid.generate();

  generateFileHash = (file) => {
    const messageDigest = forge.md.sha256.create();
    console.log(file);
    const fileSHA256 = messageDigest.update(file.data);
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
          const uploader = Files.insert({  // config settings for uploader  , meteor-files schenanigans
            file: files[i].data,
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

  handlePassChange = (event) => {
    let pass = event.target.value;
    this.setState({password: pass});
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    if (this.handlePasswordValidate()){
      this.setState({ url: this.generateUrl()});
      const fileList = document.querySelector('#files').files;
      // Add fileList encryption step here
      var encryptedFileList = encrypt(fileList, this.state.password);
      console.log(encryptedFileList);
      this.uploadFiles(encryptedFileList);
    }
    // this.setState({ url: this.generateUrl()});
    // const fileList = document.querySelector('#files').files;
    // // Add fileList encryption step here
    // var encryptedFileList = encrypt(fileList);
    // this.uploadFiles(encryptedFileList);
  }

  render() {
    if (this.state.uploaded) return <Redirect to={this.state.url} />;
    return (
      <form onSubmit={this.fileSubmitHandler}>
        <input type="file" id="files" multiple />
        Password: <input type="password" id="pass" placeholder='password'
        onChange = {this.handlePassChange}
        value = {this.state.password}
        />
        <br />
        <button type="submit">Upload</button>
      </form>
    );
  }
}
