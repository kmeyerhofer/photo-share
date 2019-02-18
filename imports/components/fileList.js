import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MongoFiles from '../api/mongoFiles.js';
// import decrypt from '../helpers/decrypt.js';
import File from './file.js';
// import { callWithPromise } from '../helpers/loadFilePromise.js';

// const password = 'testingkey';

class FileList extends Component {
  state = {
    // fileDataArray: [],
    // loaded: false,
    passwordEntered: true,
    password: 'testingkey',
  };

  renderEachFile = () => {
    return this.props.files.map((file) => {
      // console.log(file);
      return (
        <File
          key={file._id}
          fileData={file}
          password={this.state.password}
          passwordEntered={this.state.passwordEntered}
        />
      );
    });
  }

  render() {
    // if (!this.props.loading) {
    //   return (
    //     <h2>loading...</h2>
    //   );
    // } else {
      return (
        <div>
          {this.renderEachFile()}
        </div>
      );
  //   }
  }
}

export default withTracker(() => {
  const urlParam = window.location.pathname.slice(1);
  const fileSub = Meteor.subscribe('files', urlParam);
  return {
    loading: fileSub.ready(),
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);
