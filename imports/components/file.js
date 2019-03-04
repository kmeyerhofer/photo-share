import React, { Component } from 'react';
import blobUtil from 'blob-util';
import { connect } from 'react-redux';
import { commentLoad } from '../redux/actions/commentActions.js';
import callWithPromise from '../helpers/loadFilePromise.js';
import decrypt from '../helpers/decrypt.js';
import Loading from './loading.js';
import Download from './download.js';

class File extends Component {
  state = {
    fileData: '',
    loaded: false,
    decrypted: false,
    blobCreated: false,
    blobURL: '',
  };

  componentDidMount() {
    if (!this.state.loaded) {
      this.loadEachFileIntoState();
    }
  }

  componentDidUpdate = () => {
    if (this.props.passwordEntered && !this.state.decrypted) {
      this.decryptFile();
    } else if (!this.state.blobCreated) {
      try {
        this.createBlob();
      } catch (err) {
        this.props.imageCouldNotRender();
      }
    } else if (this.state.blobCreated) {
      this.props.loadComments();
    }
  }

  componentWillUnmount() {
    window.URL = window.URL || window.webkitURL;
    window.URL.revokeObjectURL(this.state.blobURL);
  }

  loadEachFileFromServ = async () => {
    const file = this.props.fileData;
    const base64EncodedFile = await callWithPromise('fileLoad', file.fileLocation);
    return base64EncodedFile;
  }

  loadEachFileIntoState = () => {
    const self = this;
    self.loadEachFileFromServ().then((data) => {
      self.setState({ fileData: data, loaded: true });
    });
  }

  decryptFile = () => {
    const file = this.props.fileData;
    this.setState(prevState => ({
      fileData: decrypt(prevState.fileData, this.props.password, file.salt, file.iv),
      decrypted: true,
    }));
  }

  createBlob = () => {
    window.URL = window.URL || window.webkitURL;
    const strippedBase64 = this.state.fileData.split(',')[1].replace(/\s/g, '');
    const blob = blobUtil.base64StringToBlob(strippedBase64);
    this.setState({
      blobURL: window.URL.createObjectURL(blob),
      blobCreated: true,
    });
  }

  renderFile = () => {
    if (this.state.decrypted) {
      return (
        <div className="file-container">
          <img className="file" src={this.state.blobURL} alt={this.state.fileData.fileName} />
          {this.state.blobCreated && (
            <Download blob={this.state.blobURL} base64={this.state.fileData} />
          )}
        </div>
      );
    }
    return (
      <Loading message="Decrypting file..." />
    );
  }

  render() {
    return this.renderFile();
  }
}

const mapDispatchToProps = dispatch => ({
  loadComments: () => {
    dispatch(commentLoad());
  },
});

export default connect(null, mapDispatchToProps)(File);
