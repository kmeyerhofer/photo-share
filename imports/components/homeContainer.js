import React from 'react';
import Upload from './upload.js';
import Instructions from './instructions.js';

export default function HomeContainer() {
  return (
    <div className="home">
      <h1>FILENCRYPT</h1>
      <Instructions />
      <Upload />
    </div>
  );
}
