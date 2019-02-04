import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Upload from './upload.js'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>hello this works</h1>
        <Upload />
      </div>
    );
  }
}
