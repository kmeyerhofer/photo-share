import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorContainer from './errorContainer.js';
import { connect } from 'react-redux';


// React Components
import HomeContainer from './homeContainer.js';
import FileListContainer from './fileListContainer.js';
import LoginPage from './loginPage.js';
import Admin from './admin.js';
import ProtectedRoute from './protectedRoute.js';


const App = (props) => {
  return (
    <ErrorContainer>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute path="/admin" component={Admin} userAuthed={props.userAuthed}/>
        <Route path="/:folderID" component={FileListContainer} />
      </Switch>
    </ErrorContainer>
  );
}

const mapStateToProps = state => {
  return{userAuthed: state.userReducer.userAuthed};
}

export default connect(mapStateToProps)(App);
