import React from 'react';

export default function Comment(props) {
  return (
    <div className="comment">
      <h3>{props.author}</h3>
      <p>{props.comment}</p>
    </div>
  );
}
