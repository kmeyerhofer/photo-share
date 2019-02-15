import React from 'react';
import { Route } from 'react-router-dom';
import ErrorContainer from './errorContainer.js';
import Upload from './upload.js';
import Folder from './folder.js';

export default function App() {
  return (
    <ErrorContainer>
      <h1>hello this works</h1>
      <Route exact path="/" component={Upload} />
      <Route path="/:folderID" component={Folder} />
    </ErrorContainer>
  );
}
