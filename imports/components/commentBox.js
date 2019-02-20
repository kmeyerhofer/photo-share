import React, {Component} from 'react';
import {CommentList} from './commentList.js';
import {CommentForm} from './commentForm.js';

export class CommentBox extends Component {
  state = {
    comments: [],
    fileID: this.props.fileID,
  }

  saveComments = (comment) => {
    //todo
    this.setState({comments: [...this.state.comments, comment]});
  }

  getComments = () => {
      //todo
    }

    render () {
      return (
        <div>
          <CommentList comments={this.state.comments}/>
          <CommentForm />
        </div>
        );
      }
}
