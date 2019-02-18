import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MongoFiles from '../api/mongoFiles.js';
import decrypt from '../helpers/decrypt.js';
import File from './file.js';
import { callWithPromise } from '../helpers/loadFilePromise.js';

const password = 'testingkey';

class FileList extends Component {
  state = {
    fileDataArray: [],
    loaded: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.loaded) {
      this.loadEachFileIntoState();
    } else {
      console.log('files are saved into state');
    }
  }

  loadEachFileFromServ = async () => { // get a better understanding of this
    const files = this.props.files;
    let fileDataArr = [];
    let base64EncodedFile;
    for (let i=0; i < files.length; i++){
        base64EncodedFile = await callWithPromise('fileLoad', files[i].fileLocation); // returns a promise, await on promise
        fileDataArr.push(decrypt(base64EncodedFile, password, files[i].salt, files[i].iv));
    }
    return fileDataArr;
  }

  loadEachFileIntoState = () => {
    const files = this.props.files;
    this.loadEachFileFromServ().then((data) => {
      this.setState({fileDataArray: data, loaded: true});
    });
  }

  renderEachFile = () => {
    return this.state.fileDataArray.map((element, i) => {
      return(
        <File key={i} fileData={element} />
      );
    });
  }


  render() {
    if (!this.props.loading) {
      return (
        <h2>loading...</h2>
      );
    } else {
      return(
        <div>
          {this.renderEachFile()}
        </div>
      );
    }
  }
}

export default withTracker(() =>{
  const urlParam = window.location.pathname.slice(10);
  const fileSub = Meteor.subscribe('files', urlParam);
  return {
    loading: fileSub.ready(),
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);
