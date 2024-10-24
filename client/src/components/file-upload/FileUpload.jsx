import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [detail, setDetail] = useState(1);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('detail', detail);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error('Error uploading file', err);
    }
  };

  return (
    <div className="file-upload">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Detail Value (1-5):</label>
          <input type="number" value={detail} onChange={handleDetailChange} min="1" max="5" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
