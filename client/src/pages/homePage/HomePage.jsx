import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import './HomePage.scss';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [summaryText, setSummaryText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSummaryTextChange = (e) => {
    setSummaryText(e.target.value);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDropzoneClick = () => {
    document.querySelector('.file-input').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    if (selectedOption === 'summary') {

      formData.append('summaryText', summaryText);
      
      try {
        const response = await fetch('http://localhost:5000/summary', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

    } else if (selectedOption === 'test') {
      formData.append('test', 'Test selected');
    }

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      <h1>Upload your file and select an option</h1>
      <div className="file-upload">
        <form onSubmit={handleSubmit} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
          <div
            className={`dropzone ${dragActive ? 'active' : ''}`}
            onClick={handleDropzoneClick}
          >
            {file ? (
              <p>File: {file.name}</p>
            ) : (
              <p>Drag and drop a file here or click to upload</p>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept=".txt,.docx,.pptx"
              className="file-input"
              style={{ display: 'none' }}
            />
          </div>

          <div className="options">
            <button type="button" onClick={() => setSelectedOption('summary')}>
              Summary
            </button>
            <button type="button" onClick={() => setSelectedOption('test')}>
              Test
            </button>
          </div>

          {selectedOption === 'summary' && (
            <label className='summary-text'>
              Summary Text:
              <input
                type="text"
                value={summaryText}
                onChange={handleSummaryTextChange}
              />
            </label>
          )}

          <button type="submit">Upload</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
