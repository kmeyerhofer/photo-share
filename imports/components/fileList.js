import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MongoFiles from '../api/mongoFiles.js';
// import decrypt from '../helpers/decrypt.js';
import File from './file.js';
import Password from './password.js'
import addErrorTimer from '../helpers/addErrorTimer.js';
import { connect } from 'react-redux';
import { addError, removeError } from '../redux/actions/errorActions';
// import { callWithPromise } from '../helpers/loadFilePromise.js';

// const password = 'testingkey';

class FileList extends Component {

  constructor(props) {
    super(props);
    addErrorTimer = addErrorTimer.bind(this);
  }

  state = {
    passwordEntered: false,
    password: '',
    passwordValid: false,
  };

  renderEachFile = () => {
      console.log('this is happening');
      return this.props.files.map((file) => {
        // console.log(file);
        return (
          <File
            key={file._id}
            fileData={file}
            password={this.state.password}
            passwordEntered={this.state.passwordEntered}
            imageCouldNotRender={this.imageCouldNotRender}
          />
        );
      });
  }

  handlePassword = (passwordObj) => { //returned as result from password component
    if(!passwordObj.passwordValid){
      addErrorTimer(passwordObj.message)
    } else {
      this.setState({
        password: passwordObj.password,
        passwordEntered: true,
      });
    }
  }

  imageCouldNotRender = () => {
    addErrorTimer('password is not correct');
    this.setState({passwordEntered: false});
  }

  render() {
    if (!this.props.loading) {
      return (
        <h2>loading...</h2>
      );
    } else if(!this.state.passwordEntered) {
      return (
        <div>
        <Password handlePassword={this.handlePassword}
        addErrorTimer={addErrorTimer}
        />
        </div>
      );
    } else {
      return (
        <div>
          {this.renderEachFile()}
        </div>
      );
    }
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

const mapStateToProps = (state) => {
  return {
    errors: state.errorReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addError: (error) => {
      dispatch(addError(error));
    },
    removeError: (error) => {
      dispatch(removeError(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(fileListWithTracker);
