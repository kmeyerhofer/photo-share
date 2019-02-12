import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../imports/components/app.js';
import store from '../imports/redux/store.js';


const rootElement = document.getElementById('app');
Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/:filter?" component={App} />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
});
