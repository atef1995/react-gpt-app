import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import QAComponent from './components/QAComponent';
import NavBar from './components/NavBar';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import ResetPasswordPage from './components/ResetPasswordPage';
import LogoutComponent from './components/LogoutComponent';
import AuthContext from './authContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  console.log('app.js' + isLoggedIn);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/ask" element={<ProtectedRoute><QAComponent /></ProtectedRoute>} />
          {/* <Route path="/ask" element={<QAComponent />} /> */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path='/register' element={<RegisterComponent />} />
          <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
          <Route path='/verify-reset-token' element={<ResetPasswordPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
