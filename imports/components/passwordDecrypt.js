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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="password" id="pass" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
