import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import TwoFactorAuthPage from './pages/TwoFactorAuthPage';
import PasswordResetPage from './pages/PasswordResetPage';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuthPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
