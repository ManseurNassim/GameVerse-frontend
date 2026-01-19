import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AccountInfo from './components/AccountInfo';
import GameDetails from './components/GameDetails';
import SearchPage from './components/SearchPage';
import RankingPage from './components/RankingPage';
import AboutPage from './components/AboutPage';
import VerifyEmail from './components/VerifyEmail';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0e0f10] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/classement" element={<RankingPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route 
            path="/account" 
            element={
              <ProtectedRoute children={<AccountInfo />} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;