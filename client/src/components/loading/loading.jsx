import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Yanıt Bekleniyor (ortalama 15 sn) ...</p>
    </div>
  );
};

export default Loading;
