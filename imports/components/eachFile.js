import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

export default class EachFile extends Component {
  // Add downloading functionality from file location here
  render() {
    return (
      <li>
        <h3>File Name: {this.props.name}</h3>
        <p>File Location: {this.props.location}</p>
        <p>File URL: {this.props.url}</p>
        <p>File id (Mongo DB id): {this.props.id}</p>
      </li>
    );
  }
}
