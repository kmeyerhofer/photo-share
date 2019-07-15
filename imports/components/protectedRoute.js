import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, userAuthed, ...rest}) => {
  return (
    <Route {...rest} render={ props => (
        userAuthed ? (<Component {...props} /> ) : (<Redirect to="/login" /> )
    )} />
  );
};

export default PrivateRoute;
