import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import forge from 'node-forge';
import shortid from 'shortid';
import { Redirect } from 'react-router-dom';
import encrypt from '../helpers/encrypt.js';
import promise from '../helpers/promise.js';
import MongoFiles from '../api/mongoFiles.js';
import Error from './error.js';
import Password from './password.js';

export default class Upload extends Component {
  constructor (props) {
    super(props);
    // binds these functions to Upload's 'this'
    this.handlePassword = this.handlePassword.bind(this);
    this.errorMessageStateTimer = this.errorMessageStateTimer.bind(this);
  }

  state = {
    uploaded: false,
    url: '',
    iv: forge.random.getBytesSync(16),
    errorMessage: false,
    password: '',
    passwordValidated: true,
  };

  handlePassword(pass, validated) {
    this.setState({
      password: pass,
      passwordValidated: validated,
    });
  }

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
      let encryptedFile = encrypt(files[i], this.state.password, this.state.iv);
      Meteor.call('fileUpload', fileData, encryptedFile, (error, result) => {
        if (error) {
          this.errorMessageStateTimer(error.message, 5000);
        } else {
          MongoFiles.insert({
            url: fileData.url,
            fileLocation: fileData.fileLocation,
            fileName: fileData.fileName,
            iv: this.state.iv,
          });
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

  errorMessageStateTimer = (message, ms) => {
    this.setState({ errorMessage: message })
    let timer = setTimeout(() => {
      this.setState(() => ({ errorMessage: false }))
      clearTimeout(timer);
    }, ms);
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    if(this.state.passwordValidated) {
      this.setState({ url: this.generateUrl()});
      const fileList = document.querySelector('#files').files;
      if (fileList.length < 1) {
        this.errorMessageStateTimer('You must select a file.', 5000)
      } else {
        this.promiseFileLoader(fileList);
      }
    }
  }

  render() {
    if (this.state.uploaded) return <Redirect to={this.state.url} />;
    return (
      <div>
        <form onSubmit={this.fileSubmitHandler}>
          <input type="file" id="files" multiple />
          <Password handlePassword={this.handlePassword} errorMessageStateTimer={this.errorMessageStateTimer} />
          <button type="submit">Upload</button>
        </form>
        {this.state.errorMessage ? <Error message={this.state.errorMessage} /> : null }
      </div>
    );
  }
}
