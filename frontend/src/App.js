import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import QAComponent from './components/QAComponent';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/qa" component={QAComponent} />
      </Routes>
    </Router>
  );
}

export default App;
