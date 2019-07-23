import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import MongoFiles from '../api/mongoFiles.js';
import FileListAdmin from './fileList-Admin.js';
import { withTracker } from 'meteor/react-meteor-data';

class Admin extends Component {

  constructor(props){
    super(props);
  }

  state = {
    token: sessionStorage.getItem('jwt'),
    files: [],
  }

  componentDidMount() {
    this.getFiles();
  }

  deleteFile = (fileLocation, url, fileName) => {
    const fileData = [fileLocation, url, fileName];
    Meteor.call('deleteFile', this.state.token, fileData, (err) => {
      if(err){
        console.log(err);
      }
    });
  }

  getFiles = () => {
    Meteor.call('retrieveFiles', (err, files) => {
      if(err){
        console.log(err); //add redux error
      }
      this.setState({files: [...this.state.files, ...files] });
    });
  }

  render() {
    return(
      <div>
        <FileListAdmin files={this.state.files} deleteFile={this.deleteFile}/>
      </div>
    );
  }
}

export default Admin;
