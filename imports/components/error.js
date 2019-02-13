import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    return (
      <div onClick={() => this.props.removeSelf(this.props.id)}>
        <h3>An error occurred:</h3>
        <p>{this.props.message}</p>
        <p>Id: {this.props.id}</p>
      </div>
    );
  }
}
