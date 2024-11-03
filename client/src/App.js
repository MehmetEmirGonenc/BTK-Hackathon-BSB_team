import React from 'react';
import HomePage from './pages/homePage/HomePage.jsx';
import { ToastContainer } from 'react-toastify';
import './App.scss'

const App = () => {
  return (
    <>
      <div className='container'>
        <HomePage />
      </div>
      <ToastContainer />
    </>
    
  );
};

export default App;

