import React, {Component} from 'react';

export default class DeleteFileButton extends Component {

  handleClick = () => {
    this.props.deleteFile(this.props.fileLocation, this.props.url, this.props.fileName);
  }

  render(){
    return(
      <button type="button" onClick={this.handleClick}>delete</button>
    );
  }
}
