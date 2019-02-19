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
  state = {
    // fileDataArray: [],
    // loaded: false,
    passwordEntered: false,
    password: '',
    imageRendered: true,
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
            imageRender={this.imageCouldNotRender}
          />
        );
      });
  }

  handlePassword = (passwordObj) => { //returned as result from password component
    this.setState({
      password: passwordObj.password,
      passwordEntered: true,
    });
  }

  imageCouldNotRender = () => {
    alert("the password is not correct");
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
        <Password handlePassword={this.handlePassword} />
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

export default withTracker(() => {
  const urlParam = window.location.pathname.slice(1);
  const fileSub = Meteor.subscribe('files', urlParam);
  return {
    loading: fileSub.ready(),
    files: MongoFiles.find({}).fetch(),
  };
})(FileList);

// const mapStateToProps = (state) => {
//   return{
//     errors: state.errorReducer,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addError: (error) => {
//       dispatch(addError(error));
//     },
//     removeError: (error) => {
//       dispatch(removeError(error));
//     },
//   };
// };
//
// export const connect(mapStateToProps, mapDispatchToProps)(FileList);
