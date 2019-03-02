import React, { Component } from 'react';

export default class Password extends Component {
  handlePassChange = (event) => {
    const pass = event.target.value;
    this.props.handlePassword(this.handlePasswordValidate(pass));
  }

  handlePasswordValidate = (pass) => {
    const result = {
      password: pass,
      passwordValid: true,
      message: '',
    };
    if (pass.length === 0) {
      result.passwordValid = false;
      result.message = 'Password cannot be blank.';
    } else if (pass.length <= 5) {
      result.passwordValid = false;
      result.message = 'Password needs to be longer than 5 characters.';
    }
    return result;
  }

  render() {
    return (
      <input type="password" id="passEncrypt" placeholder="Enter encryption password" onChange={this.handlePassChange} />
    );
  }
}
