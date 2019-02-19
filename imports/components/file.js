import React, { Component } from 'react';
import blobUtil from 'blob-util';
import { callWithPromise } from '../helpers/loadFilePromise.js';
import decrypt from '../helpers/decrypt.js';

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
      }
      catch(err) {
        console.log("incorrect password");
        this.props.imageRender();
      }
    }
  }

  componentWillUnmount() {
    window.URL = window.URL || window.webkitURL;
    window.URL.revokeObjectURL(this.state.blobURL);
  }

  loadEachFileFromServ = async () => { // get a better understanding of this
    const file = this.props.fileData;
    const base64EncodedFile = await callWithPromise('fileLoad', file.fileLocation); // returns a promise, await on promise
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
    this.setState((prevState) => ({
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
        <img src={this.state.blobURL} />
      );
    } else {
      return <h2>loading...last render</h2>;
    }
  }

  render() {
    return this.renderFile();
  }
}
