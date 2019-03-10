import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addError, removeError } from '../redux/actions/errorActions';
import { resetCommentLoad } from '../redux/actions/commentActions';
import MongoFiles from '../api/mongoFiles.js';
import encrypt from '../helpers/encrypt.js';
import promise from '../helpers/promise.js';
import {
  generateFileHash, randomBytes, generateURL, encode64,
} from '../helpers/fileUtilities.js';
import addErrorTimer from '../helpers/addErrorTimer.js';
import Password from './passwordEncrypt.js';
import Loading from './loading.js';
import FileLimitInstructions from './fileLimitInstructions.js';

class Upload extends Component {
  constructor (props) {
    super(props);
    addErrorTimer = addErrorTimer.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  state = {
    uploaded: false,
    loading: false,
    statusMessage: '',
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
      this.setState(
        { statusMessage: `Encrypting file${files.length === 1 ? '' : 's'}...` },
      );
      const encryptedFile = encrypt(files[i], this.state.password, this.state.salt, this.state.iv);
      Meteor.call('fileUpload', fileData, encryptedFile, (error) => {
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
            self.setState({ uploaded: true, loading: false });
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

  fileTypeInvalid = fileType => !fileType.match(/image\/(gif|jpeg|jpg|png|bmp)/i)

  fileSizeInvalid = fileSize => fileSize >= 5000000 // 5 MB

  filesInvalid = (fileList) => {
    const self = this;
    return Array.from(fileList).some(function(file) {
      const invalidType = self.fileTypeInvalid(file.type);
      const invalidSize = self.fileSizeInvalid(file.size);
      let errorMessage = '';
      if (invalidType && invalidSize) {
        errorMessage = `${file.name} is an invalid file type of ${file.type} and is larger than 5 MB.`;
        addErrorTimer(errorMessage);
      } else if (invalidType) {
        errorMessage = `${file.name} has an invalid file type of ${file.type}.`;
        addErrorTimer(errorMessage);
      } else if (invalidSize) {
        errorMessage = `${file.name} is larger than 5MB.`;
        addErrorTimer(errorMessage);
      }
      return invalidType || invalidSize;
    });
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    const fileList = document.querySelector('#files').files;
    if (this.state.passwordValidated && fileList.length >= 1) {
      this.setState({ url: generateURL() });
      this.setState(
        {
          loading: true,
          statusMessage:
            `Loading file${fileList.length === 1 ? '' : 's'}...`,
        },
      );
      this.promiseFileLoader(fileList);
    } else if (fileList.length < 1) {
      addErrorTimer('You must select a file.');
    } else if (this.filesInvalid(fileList)) {
      // If the files in the list are valid
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
    this.props.resetCommentLoad();
    if (this.state.uploaded) return <Redirect to={this.state.url} />;
    return (
      <form className="upload-grid" onSubmit={this.fileSubmitHandler}>
        <div className="file-select-container">
          <input type="file" id="files" multiple />
          <FileLimitInstructions />
        </div>
        <Password
          handlePassword={this.handlePassword}
          addErrorTimer={addErrorTimer}
        />
        <button type="submit" className="button" disabled={this.state.loading}>Upload</button>
        {this.state.loading && (
        <div className="upload-loading">
          <Loading message={this.state.statusMessage} />
        </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errorReducer,
});

const mapDispatchToProps = dispatch => ({
  addError: (error) => {
    dispatch(addError(error));
  },
  removeError: (error) => {
    dispatch(removeError(error));
  },
  resetCommentLoad: () => {
    dispatch(resetCommentLoad());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
