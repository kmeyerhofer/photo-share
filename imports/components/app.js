import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// React Components
import Upload from './upload.js';
import Folder from './folder.js';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>hello this works</h1>
          <Route exact path='/' component={Upload} />
          <Route path='/:folderID' component={Folder} />
        </div>
      </BrowserRouter>
    );
  }
}
