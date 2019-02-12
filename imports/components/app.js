import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// React Components
import ErrorContainer from './errorContainer.js';
import Upload from './upload.js';
import Folder from './folder.js';

export default class App extends Component {
  render() {
    return (
      <ErrorContainer>
        <h1>hello this works</h1>
        <Route exact path='/' component={Upload} />
        <Route path='/:folderID' component={Folder} />
      </ErrorContainer>
    )
  }
}
