import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm transition-colors duration-300">
      <div className="flex justify-between items-center py-2 px-6 md:px-8 h-[52px]">
        <img 
          src={logo}
          alt="GameVerse Logo"
          onClick={() => navigate('/')}
          className="h-14 md:h-20 cursor-pointer hover:opacity-80 transition-opacity"
        />
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => navigate('/search')} className="hover:text-blue-400 transition-colors cursor-pointer">RECHERCHE</button>
          <Link to="/classement" className="hover:text-blue-400 transition-colors">CLASSEMENT</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">À PROPOS</Link>

          {loading ? (
            <div className="w-24 h-10 bg-gray-700/30 animate-pulse rounded-full"></div>
          ) : isAuthenticated ? (
            <Link to="/account" className="flex items-center gap-3 bg-blue-600/20 hover:bg-blue-600/40 px-4 py-2 rounded-full border border-blue-500/30 transition-all backdrop-blur-sm">
              <span className="text-blue-200">{user?.username}</span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{user?.username?.charAt(0).toUpperCase()}</div>
            </Link>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition-transform transform hover:scale-105 shadow-lg shadow-blue-600/30">CONNEXION</Link>
          )}
        </nav>

        <button className="md:hidden z-50 text-white p-1 focus:outline-none hover:text-blue-500 transition-colors relative" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      <div className={`fixed top-0 right-0 w-1/3 min-w-[140px] h-screen bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-start pt-24 gap-6 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden border-l border-white/10 shadow-xl`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors border-b border-gray-800 pb-2 w-3/4 text-center">Accueil</Link>
        <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors border-b border-gray-800 pb-2 w-3/4 text-center">Recherche</Link>
        <Link to="/classement" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors border-b border-gray-800 pb-2 w-3/4 text-center">Classement</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors border-b border-gray-800 pb-2 w-3/4 text-center">À Propos</Link>
        {loading ? (
          <div className="w-20 h-8 bg-gray-700/30 animate-pulse rounded-full mt-2"></div>
        ) : isAuthenticated ? (
          <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold bg-blue-600/20 border border-blue-500 px-3 py-2 rounded-full text-blue-300 mt-2 truncate max-w-[90%]">Mon Compte</Link>
        ) : (
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold bg-blue-600 px-4 py-2 rounded-full text-white mt-2">Connexion</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
