import React from 'react';

export default function EachFile(props) {
  return (
    <li>
      <h3>
        File Name:
        {props.name}
      </h3>
      <p>
        File Location:
        {props.location}
      </p>
      <p>
        File URL:
        {props.url}
      </p>
      <p>
        File id (Mongo DB id):
        {props.id}
      </p>
    </li>
  );
}
