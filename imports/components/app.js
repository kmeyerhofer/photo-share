import React, { Component } from 'react';
import Upload from './upload.js'
import { withTracker } from 'meteor/react-meteor-data';

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
