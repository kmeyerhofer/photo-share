import React, { Component } from 'react';
import blobUtil from 'blob-util';
import { callWithPromise } from '../helpers/loadFilePromise.js';
import decrypt from '../helpers/decrypt.js';

export default class File extends Component {
  state = {
    fileData: '',
    loaded: false,
    decrypted: false,
  };

  // retrieveFile = () => {
  //   console.log('loaded and passwordEntered', this.state.loaded, this.props.passwordEntered);
  //   if (!this.state.loaded && this.props.passwordEntered) {
  //     this.loadEachFileIntoState();
  //   }
  // }

  componentDidUpdate = () => {
    if (!this.state.loaded) {
      this.loadEachFileIntoState();
    } else if (this.props.passwordEntered) {
      // decrypt
    }
  }

  loadEachFileFromServ = async () => { // get a better understanding of this
    const file = this.props.fileData;
    // console.log(file);
    // let fileData = '';
    // let base64EncodedFile;
    // for (let i = 0; i < files.length; i++) {
    const base64EncodedFile = await callWithPromise('fileLoad', file.fileLocation); // returns a promise, await on promise
    // const fileData = decrypt(base64EncodedFile, this.props.password, file.salt, file.iv);
    // }
    return base64EncodedFile;
  }

  loadEachFileIntoState = () => {
    this.loadEachFileFromServ().then((data) => {
      this.setState({ fileData: data, loaded: true });
    });
  }

  decryptFile = () => {
    const file = this.props.fileData;
    this.setState({
      fileData: decrypt(this.state.fileData, this.props.password, file.salt, file.iv),
      decrypted: true,
    });
  }

  renderFile = () => {
    window.URL = window.URL || window.webkitURL;
    const strippedBase64 = this.state.fileData.split(',')[1].replace(/\s/g, '');
    const blob = blobUtil.base64StringToBlob(strippedBase64);
    return (
      <img src={window.URL.createObjectURL(blob)} />
    );
  }

  render() {
    if (this.props.loaded && this.props.passwordEntered && this.props.decrypted) {
      // render
      return this.renderFile();
    } else if (this.props.loaded && this.props.passwordEntered) {
      // decrypt
      this.decryptFile();
    } else if (!this.state.loaded) {
      // load files
      this.loadEachFileIntoState();
    }
  }
}
