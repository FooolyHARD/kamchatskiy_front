import React, { useState } from 'react';
import "../styles/Upload.css"
import axios from 'axios';

const ImageDisplayComponent = ({ imageUrl }) => {
  return (
    <div>
      <h2>Current Image</h2>
      <img src={imageUrl} alt="Rotated Image" />
    </div>
  );
};

const FileUploadComponent = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('rotation_angle', 180);

    try {
      const response = await axios.post("http://10.66.66.7:5050/upload_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", response.data);
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Зона тестов</h1>
        <input
          accept="image/*"
          name="customFile"
          type="file"
        />
        <button type="submit">Сохранить и закрыть</button>
      </form>

      {imageUrl && <ImageDisplayComponent imageUrl={imageUrl} />}
    </div>
  );
};

export default FileUploadComponent;
