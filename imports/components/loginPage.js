import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import {Route, Redirect} from 'react-router-dom';
import { toggleUserAdmin } from '../redux/actions/userActions.js';
import { connect } from 'react-redux';

class LoginPage extends Component {

  constructor(props){
    super(props);
  }

  state = {
    username: "",
    password: "",
    redirect: false,
  }

  loginSubmit = (evt) => {
    evt.preventDefault();
    Meteor.call('loginAdmin', this.state.username, this.state.password, (err, token) => {
      if(err){
        console.log(err);
        return;
      }
      if(token){
        sessionStorage.setItem('jwt', token);
        this.props.authUser();
        this.setState({redirect: true});
      }
      return;
    });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to='/admin'/>
    }

    return(
      <form onSubmit={this.loginSubmit}>
        <div>
          <input type='username' name='username' placeholder="username" onChange={(evt) => this.setState({username: evt.target.value})}/>
        </div>
        <div>
          <input type='password' name='password' placeholder="password" onChange={(evt) => this.setState({password: evt.target.value})}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {userAuthed: state.userReducer.userAuthed};
}

const mapDispatchToProps = dispatch => {
  return{
      authUser: () => dispatch(toggleUserAdmin()),
  };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default Login;
