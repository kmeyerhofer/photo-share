import React, {Component} from 'react';
import {Comment} from './comment.js';

export class CommentList extends Component {
  commentsMap = () => {
    return this.props.comments[0].comments.map((commentData, index) => {
      return(
        <Comment key={index} author={commentData.author} comment={commentData.comment} />
      );
    });
  }

  render() {
    return(
      <div>
        {this.commentsMap()}
      </div>
    );
  }
}
