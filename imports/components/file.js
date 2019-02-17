import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';

export default class File extends Component {

  state = {
    fileData: this.props.fileData,
  }


  render() {

    return(
      <div>
        <img src={`${this.state.fileData}`} />
      </div>
      // <div>{this.props.fileData.slice(0,20)}</div>
    );
  }
}
