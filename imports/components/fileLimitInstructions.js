/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function FileLimitInstructions() {
  return (
    <ul className="upload-instructions">
      <li><span className="asterisk">*</span> Image files only</li>
      <li><span className="asterisk">*</span> 5MB maximum</li>
    </ul>
  );
}
