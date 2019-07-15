import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import LoginPage from './loginPage';

const loginRedirect = () => {
  return(
      <div>
        <Link to="/login">Login</Link>
      </div>
  );
}

export default loginRedirect;
