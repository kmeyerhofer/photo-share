import React, { Component } from 'react';
import extractMIMEType from '../helpers/extractMIMEType.js';
import { generateURL } from '../helpers/fileUtilities.js';

export default class Download extends Component {
  state = {
    fileName: generateURL(),
  };

  createDownloadLink = () => {
    const result = extractMIMEType(this.props.base64);
    const fileName = `${this.state.fileName}.${result}`;

    return (
      <div className="download">
        <a className="button" href={this.props.blob} download={fileName}>Download file</a>
      </div>
    );
  }

  render() {
    return this.createDownloadLink();
  }
}
