import React, { useState, useEffect } from 'react';
import './loading.scss';

const Loading = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Yanıt Bekleniyor... Geçen süre: {elapsedTime} saniye</p>
    </div>
  );
};

export default Loading;
