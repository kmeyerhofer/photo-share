import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MongoFiles from '../api/mongoFiles.js';
import File from './file.js';
import Password from './passwordDecrypt.js'
import addErrorTimer from '../helpers/addErrorTimer.js';
import { connect } from 'react-redux';
import { addError, removeError } from '../redux/actions/errorActions';
import Loading from './loading.js';
import CommentBox from './commentBox';
import {generateURL} from '../helpers/fileUtilities.js';


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
    return this.props.files.map((file , index) => {
        return (
        <div key={index}>
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
        );
      }
    );
  }

  handlePassword = (passwordObj) => {
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
        <Loading message={'loading files'} />
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

// subscriptions(redux and meteor)


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
