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
    } else if (pass.length <= 5) {
      result.passwordValid = false;
      result.message = 'Password needs to be longer than 5 characters.';
    }
    return result;
  }

  render() {
    return (
      <form className="file-list-form" onSubmit={this.handleFormSubmit}>
        <input className="file-list-pass" type="password" id="passDecrypt" placeholder="Enter Password" value={this.state.password} onChange={this.handlePassChange} />
        <button className="file-list-button" type="submit">Submit</button>
      </form>
    );
  }
}
