import React, { Component } from 'react';
import blobUtil from 'blob-util';
import callWithPromise from '../helpers/loadFilePromise.js';
import decrypt from '../helpers/decrypt.js';
import Loading from './loading.js';

export default class File extends Component {
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
        <img className="file" src={this.state.blobURL} alt={this.state.fileData.fileName} />
      );
    }
    return (
      <Loading message="decrypting file" />
    );
  }

  render() {
    return this.renderFile();
  }
}
