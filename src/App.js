import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
