import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorContainer from './errorContainer.js';

// React Components
import HomeContainer from './homeContainer.js';
import FileListContainer from './fileListContainer.js';


export default function App() {
  return (
    <ErrorContainer>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/:folderID" component={FileListContainer} />
      </Switch>
    </ErrorContainer>
  );
}
