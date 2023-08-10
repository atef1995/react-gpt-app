import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import QAComponent from './components/QAComponent';
import NavBar from './components/NavBar';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import ResetPasswordPage from './components/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/ask" element={<QAComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
        <Route path='/verify-reset-token' element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
