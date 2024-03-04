import React, { useState } from 'react';

const ImageViewer = ({ imageUrl }) => {
  return (
    <div>
      <h2>Current Image</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Current Image" style={{ maxWidth: '100%' }} />
      ) : (
        <p>No image to display</p>
      )}
    
    </div>
  );
};

export default ImageViewer;
