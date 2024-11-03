import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import Navbar from '../../components/navbar/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/loading/loading.jsx';
import './HomePage.scss';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [summaryResponse, setSummaryResponse] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFilePreview(URL.createObjectURL(uploadedFile));
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
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDropzoneClick = () => {
    document.querySelector('.file-input').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);

    if (selectedOption === 'summary') {
      formData.append('context', summaryText);
      try {
        const response = await fetch('http://localhost:5000/summary', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.response) {
          setSummaryResponse(data.response);
          setLoading(false)
        } else {
          console.error('No response received from the server');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (selectedOption === 'test') {
      formData.append('test', 'Test selected');
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      <div className="container">
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
                accept=".txt,.docx,.pptx,.jpg,.png,.pdf"
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
              <label className="summary-text">
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

          {/* Preview Section */}
          <div className="file-preview">
            {filePreview ? (
              file.type.startsWith('image') ? (
                <img src={filePreview} alt="Uploaded preview" />
              ) : file.type === 'application/pdf' ? (
                <div style={{ height: '750px' }}>
                  <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
                    <Viewer fileUrl={filePreview} />
                  </Worker>
                </div>
              ) : (
                <pre>{filePreview}</pre>
              )
            ) : (
              <p>No preview available</p>
            )}
          </div>
        </div>
          {loading ? <Loading/> : 
            <div className='display-result'>
            <ReactMarkdown>
              {summaryResponse || "No summary available"}
            </ReactMarkdown>
            </div>
          }
        
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
