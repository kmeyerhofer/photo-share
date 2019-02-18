import React, { Component } from 'react';
import blobUtil from 'blob-util';
import { callWithPromise } from '../helpers/loadFilePromise.js';
import decrypt from '../helpers/decrypt.js';

export default class File extends Component {
  state = {
    fileData: '',
    loaded: false,
  };

  // retrieveFile = () => {
  //   console.log('loaded and passwordEntered', this.state.loaded, this.props.passwordEntered);
  //   if (!this.state.loaded && this.props.passwordEntered) {
  //     this.loadEachFileIntoState();
  //   }
  // }

  componentDidUpdate = () => {
    if (!this.state.loaded && this.props.passwordEntered) {
      this.loadEachFileIntoState();
    }
  }

  loadEachFileFromServ = async () => { // get a better understanding of this
    const file = this.props.fileData;
    console.log(file);
    // let fileData = '';
    // let base64EncodedFile;
    // for (let i = 0; i < files.length; i++) {
    const base64EncodedFile = await callWithPromise('fileLoad', file.fileLocation); // returns a promise, await on promise
    const fileData = decrypt(base64EncodedFile, this.props.password, file.salt, file.iv);
    // }
    return fileData;
  }

  loadEachFileIntoState = () => {
    this.loadEachFileFromServ().then((data) => {
      this.setState({ fileData: data, loaded: true });
    });
  }

  render() {
    window.URL = window.URL || window.webkitURL;
    // this.retrieveFile();
    // console.log(this.state.fileData);
    const strippedBase64 = this.state.fileData.split(',')[1].replace(/\s/g, '');
    const blob = blobUtil.base64StringToBlob(strippedBase64);
    return (
      <img src={window.URL.createObjectURL(blob)} />
    );
  }
}
