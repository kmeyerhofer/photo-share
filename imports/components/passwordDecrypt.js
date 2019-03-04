import React, { Component } from 'react';

export default class Password extends Component {
  state = {
    password: '',
  }

  handlePassChange = (pass) => {
    this.setState({ password: pass.target.value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.handlePassword(this.handlePasswordValidate(this.state.password));
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
    }
    return result;
  }

  render() {
    return (
      <form className="file-list-form" onSubmit={this.handleFormSubmit}>
        <input className="file-list-pass" type="password" id="passDecrypt" placeholder="Enter decryption password" value={this.state.password} onChange={this.handlePassChange} />
        <button className="file-list-button button" type="submit">Submit</button>
      </form>
    );
  }
}
