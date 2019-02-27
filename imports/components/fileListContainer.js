import React from 'react';
import FileList from './fileList.js';

export default function FileListContainer(props) {
  const urlParam = props.location.pathname.slice(1);
  return (
    <div>
      <h1>{urlParam}</h1>
      <FileList location={urlParam} />
    </div>
  );
}
