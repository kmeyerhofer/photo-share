import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import MongoFiles from '../api/mongoFiles.js';
import File from './file.js';
import Password from './passwordDecrypt.js';
import addErrorTimer from '../helpers/addErrorTimer.js';
import { addError, removeError } from '../redux/actions/errorActions';
import Loading from './loading.js';


class FileList extends Component {
  constructor(props) {
    super(props);
    addErrorTimer = addErrorTimer.bind(this);
  }

  state = {
    passwordEntered: false,
    password: '',
  };

  renderEachFile = () => this.props.files.map(file => (
    <File
      key={file._id}
      fileData={file}
      password={this.state.password}
      passwordEntered={this.state.passwordEntered}
      imageCouldNotRender={this.imageCouldNotRender}
    />
  ))

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
    addErrorTimer('password is not correct');
    this.setState({ passwordEntered: false });
  }

  render() {
    if (!this.props.loading) {
      return (
        <Loading message="loading files" />
      );
    } if (!this.state.passwordEntered) {
      return (
        <div>
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

const fileListWithTracker = withTracker(() => {
  const urlParam = window.location.pathname.slice(1);
  const fileSub = Meteor.subscribe('files', urlParam);
  return {
    loading: fileSub.ready(),
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);

const mapStateToProps = state => ({
  errors: state.errorReducer,
});

const mapDispatchToProps = dispatch => ({
  addError: (error) => {
    dispatch(addError(error));
  },
  removeError: (error) => {
    dispatch(removeError(error));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(fileListWithTracker);
