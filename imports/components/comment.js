import React from 'react';

export default function Comment(props) {
  return (
    <div className="comment-container">
      {
        <div className="comment-author">
          {props.author ? props.author : 'Anonymous'}
        </div>
      }
      {props.comment && (
        <div className="comment-text">
          {props.comment}
        </div>
      )}
    </div>
  );
}
