import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorContainer from './errorContainer.js';

// React Components
import Upload from './upload.js';
import FileList from './fileList.js';

export default function App() {
  return (
    <ErrorContainer>
      <h1>hello this works</h1>
      <Switch>
        <Route exact path="/" component={Upload} />
        <Route path="/:folderID" component={FileList} />
      </Switch>
    </ErrorContainer>
  );
}
