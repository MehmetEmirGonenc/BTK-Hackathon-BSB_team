import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Yükleniyor...</p>
    </div>
  );
};

export default Loading;
