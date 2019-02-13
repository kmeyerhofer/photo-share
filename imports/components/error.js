import React from 'react';

export default function Error(props) {
  return (
    <h3 onClick={() => props.removeSelf(props.id)}>{props.message}</h3>
  );
}
