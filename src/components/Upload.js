import React, { useState } from 'react';
import "../styles/Upload.css"

const FileUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Files uploaded successfully:', data);
          setIsFileUploaded(true);
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        });
    } else {
      console.error('No files selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      {isFileUploaded && <p>Files uploaded successfully!</p>}
    </div>
  );
};

export default FileUploadComponent;
