import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// React Components to import
import App from '../imports/components/app.js';

FlowRouter.route('/:folderURL', {
  name: 'Folder.show',
  action(params) {
    console.log('Looking for a folder?');
  },
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    ReactDOM.render(<App />, document.getElementById('app'));
  },
});

FlowRouter.notFound = {
  action() {

  },
}
