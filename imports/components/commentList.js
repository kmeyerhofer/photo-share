import React, {Component} from 'react';
import {Comment} from './comment.js';

export class CommentList extends Component {
  commentsMap = () => {
    console.log(this.props.comments);
    return this.props.comments[0].comments.map((commentData, index) => {
      return(
        <Comment key={index} author={commentData.author} comment={commentData.comment} />
      );
    });
  }

  render() {
    if(this.props.comments && this.props.comments.length > 0){
      return(
        <div>
          {this.commentsMap()}
        </div>
      );
    } else {
      return(
        <div>
        </div>
      );
    }
  }
}
