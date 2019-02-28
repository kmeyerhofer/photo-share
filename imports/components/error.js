import React from 'react';

export default function Error(props) {
  return (
    <span
      className="error"
      onClick={() => props.removeSelf(props.id)}>{props.message}
    </span>
  );
}
