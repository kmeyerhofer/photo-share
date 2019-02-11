import React, { Component } from 'react';

export default class Password extends Component {
  handlePassChange = (event) => {
    let pass = event.target.value;
    this.props.handlePassword(pass, this.handlePasswordValidate(pass));
  }

  handlePasswordValidate = (pass) => {
    let formIsValid = true;
    let err = '';
    if (pass.length === 0) {
      formIsValid = false;
      err = 'Password cannot be blank.';
      this.props.errorMessageStateTimer(err, 5000);
    } else if (pass.length < 5 ) {
        formIsValid = false;
        err = 'Password needs to be longer than 5 characters.';
        this.props.errorMessageStateTimer(err, 5000);
    }
    return formIsValid;
  }

  render() {
    return (
    <input type="password" id="pass" placeholder="Password" onChange={this.handlePassChange} />
    );
  }
}
