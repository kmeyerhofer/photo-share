import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/components/app.js';


Meteor.startup(() => {
  ReactDOM.render(<App /> , document.getElementById('app'));    // everything begins with this method, client and server side.
});
