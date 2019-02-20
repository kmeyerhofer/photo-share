import React, {Component} from 'react';
import {Comment} from './comment.js';

export class CommentList extends Component {
  commentsMap = () => {
    return this.props.comments.map((comment, index) => {
      return(
        <Comment key={index} comment={comment} />
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
