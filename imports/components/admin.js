import React, {Component} from 'react';

export default class Admin extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log(sessionStorage.getItem('jwt'));
    console.log(this.props);
    return(
      <h1>This is the admin page</h1>
    );
  }
}
