import React from 'react';

export default function Comment(props) {
  return (
    <div>
      <header>
        <h3>{props.author}</h3>
        <p>{props.comment}</p>
      </header>
    </div>
  );
}
