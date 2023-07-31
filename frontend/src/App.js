import React from 'react';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import QAComponent from './components/QAComponent';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/qa" element={<QAComponent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
