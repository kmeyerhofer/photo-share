import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import MongoFiles from '../api/mongoFiles.js';
import EachFile from './eachFile.js';
import NoFileFound from './noFileFound.js';

class Folder extends Component {
  renderEachFile = () => {
    const files = this.props.files;
    if (files.length <= 0) {
      // Nothing found in database
      return (
        <NoFileFound />
      );
    } else {
      return files.map((file) => {
        return (
          <EachFile
            key={file._id}
            id={file._id}
            name={file.fileName}
            location={file.fileLocation}
            url={file.url}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>This is the folder component!</h2>
        <ul>
          {this.renderEachFile()}
        </ul>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default withTracker(() => {
  const urlParam = window.location.pathname.slice(1);
  Meteor.subscribe('files', urlParam);
  return {
    files: MongoFiles.find({}).fetch(),
  };
})(Folder);
