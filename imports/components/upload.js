import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addError, removeError } from '../redux/actions/errorActions';
import MongoFiles from '../api/mongoFiles.js';
import encrypt from '../helpers/encrypt.js';
import promise from '../helpers/promise.js';
import { generateFileHash, randomBytes, generateURL, encode64 } from '../helpers/fileUtilities.js';
import addErrorTimer from '../helpers/addErrorTimer.js';
import Password from './password.js';

class Upload extends Component {
  constructor (props) {
    super(props);
    addErrorTimer = addErrorTimer.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  state = {
    uploaded: false,
    url: '',
    iv: randomBytes(16),
    salt: randomBytes(128),
    password: '',
    passwordError: 'Password cannot be blank.',
    passwordValidated: false,
  };

  uploadEncryptedFiles = (fileInfo, files) => {
    const self = this;
    for (let i = 0; i < files.length; i += 1) {
      const fileName = generateFileHash(files[i]);
      const fileData = {
        url: `${self.state.url}`,
        fileLocation: `${self.state.url}/${fileName}`,
        fileName,
      };
      const encryptedFile = encrypt(files[i], this.state.password, this.state.salt, this.state.iv);
      Meteor.call('fileUpload', fileData, encryptedFile, (error, result) => {
        if (error) {
          addErrorTimer(error.message);
        } else {
          MongoFiles.insert({
            url: fileData.url,
            fileLocation: fileData.fileLocation,
            fileName: fileData.fileName,
            salt: encode64(this.state.salt),
            iv: encode64(this.state.iv),
          });
          if (i === files.length - 1) { // Last file in the array
            self.setState({ uploaded: true });
          }
        }
      });
    }
  }

  promiseFileLoader = async (fileList) => {
    const self = this;
    const fileListArr = [];
    for (let i = 0; i < fileList.length; i += 1) {
      fileListArr.push(promise(fileList[i]));
    }
    Promise.all(fileListArr).then((values) => {
      self.uploadEncryptedFiles(fileList, values);
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    const fileList = document.querySelector('#files').files;
    if (this.state.passwordValidated && fileList.length >= 1) {
      this.setState({ url: generateURL() });
      this.promiseFileLoader(fileList);
    } else if (fileList.length < 1) {
      addErrorTimer('You must select a file.');
    } else if (!this.state.passwordValidated) {
      addErrorTimer(this.state.passwordError);
    }
  }

  handlePassword(passwordObj) {
    this.setState({
      password: passwordObj.password,
      passwordValidated: passwordObj.passwordValid,
      passwordError: passwordObj.message,
    });
  }

  render() {
    // if (this.state.uploaded) return <Redirect to={this.state.url} />;
    return (
      <form onSubmit={this.fileSubmitHandler}>
        <input type="file" id="files" multiple />
        <Password
          handlePassword={this.handlePassword}
          addErrorTimer={addErrorTimer}
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errorReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addError: (error) => {
      dispatch(addError(error));
    },
    removeError: (error) => {
      dispatch(removeError(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
