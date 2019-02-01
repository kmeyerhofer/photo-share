import React, { Component } from 'react';
import shortid from 'shortid';
import forge from 'node-forge';
import { Files } from '../api/files.js';

export default class Upload extends React.Component {
  generateUrl = () => shortid.generate();

  generateFileLocation = (file) => {
    let messageDigest = forge.md.sha256.create();
    let fileSHA256 = messageDigest.update(file.name);
    return 'tmp/' + fileSHA256.digest().toHex().toString();
  }

  saveFilesToDB = (files, url) => {
    for (let i = 0; i < files.length; i += 1) {
      Files.insert({
        url,
        fileLocation: this.generateFileLocation(files[i])
      });
    }
  }

  fileSubmitHandler = (event) => {
    event.preventDefault();
    let url = this.generateUrl();
    let fileList = document.querySelector('#files').files;
    // Add fileList encryption step here
    this.saveFilesToDB(fileList, url);
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
