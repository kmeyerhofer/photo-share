import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MongoFiles from '../api/mongoFiles.js';
import { withTracker } from 'meteor/react-meteor-data';
import decrypt from '../helpers/decrypt.js';


const password = 'testingkey';

class FileList extends Component {

  renderEachFile = () => {
    const files = this.props.files;
    for (var i = 0; i < files.length; i++){
      let salt = files[i].salt;
      let iv = files[i].iv;
      Meteor.call('fileLoad', files[i].fileLocation, (error, result) => {
        if(error){
          console.log(error);
        } else {
          let encryptedFile = result;
          decrypt(encryptedFile, password, salt, iv);
        }
      })

    }
  }

  render(){
    return (
      <div>
        hello
        {this.renderEachFile()}
      </div>

    );
  }
}

export default withTracker(() =>{
  const urlParam = window.location.pathname.slice(10);
  Meteor.subscribe('files', urlParam);
  return {
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);
