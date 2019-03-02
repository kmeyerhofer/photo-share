import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MongoFiles from '../api/mongoFiles.js';
import File from './file.js';
import Password from './passwordDecrypt.js';
import addErrorTimer from '../helpers/addErrorTimer.js';
import { addError, removeError } from '../redux/actions/errorActions.js';
import Loading from './loading.js';
import CommentBox from './commentBox.js';
import { generateURL } from '../helpers/fileUtilities.js';

class FileList extends Component {
  constructor(props) {
    super(props);
    addErrorTimer = addErrorTimer.bind(this);
  }

  state = {
    passwordEntered: false,
    password: '',
  };

  renderEachFile = () => {
    if (this.props.files.length === 0) {
      addErrorTimer('No files exist at the URL visited.');
      return <Redirect to="/" />;
    }
    return this.props.files.map(file => (
      <div className="file-grid" key={generateURL()}>
        <File
          key={generateURL()}
          fileData={file}
          password={this.state.password}
          passwordEntered={this.state.passwordEntered}
          imageCouldNotRender={this.imageCouldNotRender}
        />

        <CommentBox
          key={generateURL()}
          id={file._id}
        />
      </div>
    ));
  }

  handlePassword = (passwordObj) => {
    if (!passwordObj.passwordValid) {
      addErrorTimer(passwordObj.message);
    } else {
      this.setState({
        password: passwordObj.password,
        passwordEntered: true,
      });
    }
  }

  imageCouldNotRender = () => {
    addErrorTimer('Password is not correct.');
    this.setState({ passwordEntered: false });
  }

  render() {
    if (!this.props.loading) {
      return (
        <Loading message="Loading files..." />
      );
    } if (!this.state.passwordEntered) {
      return (
        <div className="file-list-grid">
          <h2 className="file-list-instruction">Enter the password below to decrypt the files sent to you</h2>
          <Password
            handlePassword={this.handlePassword}
            addErrorTimer={addErrorTimer}
          />
        </div>
      );
    }
    return (
      <div>
        {this.renderEachFile()}
      </div>
    );
  }
}

const fileListWithTracker = withTracker((location) => {
  const urlParam = location.location;
  const fileSub = Meteor.subscribe('files', urlParam);
  return {
    loading: fileSub.ready(),
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);


const mapDispatchToProps = dispatch => ({
  addError: (error) => {
    dispatch(addError(error));
  },
  removeError: (error) => {
    dispatch(removeError(error));
  },
});

export default connect(null, mapDispatchToProps)(fileListWithTracker);
