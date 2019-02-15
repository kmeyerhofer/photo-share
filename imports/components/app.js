import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


// React Components
import Upload from './upload.js';
import Folder from './folder.js';
import FileList from './fileList.js';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Upload} />
            <Route path='/fileList/:folderID' component={FileList} />
            <Route path='/:folderID' component={Folder} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
