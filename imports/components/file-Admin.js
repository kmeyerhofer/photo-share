import React from 'react';
import DeleteFileButton from './deleteFileButton.js';

const FileAdmin = (props) => {
  // console.log(typeof files);

  //pass in prop from admin to button component
  return(
    <li>
      <div>
        {props.fileName}
        <DeleteFileButton deleteFile={props.deleteFile} url={props.url} fileLocation={props.fileLocation} fileName={props.fileName}/>
      </div>
    </li>
  );
}

export default FileAdmin;
