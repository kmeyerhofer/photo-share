import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';

export default class File extends Component {


  render() {
      var  base64Data = this.props.fileData;

    return(
      <div>
        <img src={`${base64Data}`} />
      </div>
      // <div>{this.props.fileData.slice(0,20)}</div>
    );
  }
}
