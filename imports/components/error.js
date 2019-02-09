import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    return (
      <div>
        <h3>An error occurred:</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
