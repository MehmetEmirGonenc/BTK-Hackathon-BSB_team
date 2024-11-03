import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Navbar from '../../components/navbar/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import './HomePage.scss';

async function loadPDFWorker() {
  const { default: worker } = await import('pdfjs-dist/legacy/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([worker], { type: 'application/javascript' }));
}


const HomePage = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [summaryResponse, setSummaryResponse] = useState('');


  useEffect(() => {
    loadPDFWorker();
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // File preview logic (for text, images, PDF, and PPTX)
    if (uploadedFile && uploadedFile.type.startsWith('text')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsText(uploadedFile);
    } else if (uploadedFile && uploadedFile.type.startsWith('image')) {
      setFilePreview(URL.createObjectURL(uploadedFile));
    } else if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFilePreview(URL.createObjectURL(uploadedFile));
    } else {
      setFilePreview(''); // Reset preview for unsupported file types
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
                setSummaryResponse(data.response);  // Set the response in state
                console.log(data.response)
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
                <Document file={filePreview} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              ) : (
                <pre>{filePreview}</pre>
              )
            ) : (
              <p>No preview available</p>
            )}
          </div>
        </div>

        <div className='display-result'>
            {summaryResponse ? (
                <pre>{summaryResponse}</pre>  // Display the summary response
            ) : (
                <p>No summary available</p>  // Default message if no summary
            )}
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
