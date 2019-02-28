import React, { Component } from 'react';
import Comment from './comment.js';
import { generateURL } from '../helpers/fileUtilities.js';

export default class CommentList extends Component {
  commentsMap = () => this.props.comments[0].comments.map(commentData => (
    <Comment key={generateURL()} author={commentData.author} comment={commentData.comment} />
  ))

  render() {
    if (this.props.comments && this.props.comments.length > 0) {
      return (
        <div className="comment-flexbox">
          {this.commentsMap()}
        </div>
      );
    }
    return (
      null
    );
  }
}
