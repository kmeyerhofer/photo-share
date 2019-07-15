import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../imports/components/app.js';
import store from '../imports/redux/store.js';
import LoginPage from '../imports/components/loginPage.js';

const rootElement = document.getElementById('app');
Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
      <div>
        <Route path="/:filter?" component={App} />
      </div>
      </BrowserRouter>
    </Provider>,
    rootElement,
  );
});
