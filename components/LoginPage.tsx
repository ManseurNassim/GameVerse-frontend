import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import afficheBg from '../assets/images/affiche3.jpg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.emailNotVerified) {
        setError('❌ Veuillez vérifier votre email avant de vous connecter. Consultez votre boîte mail.');
      } else {
        setError(err.message || 'Impossible de se connecter');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `url(${afficheBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row gap-10 p-6">
        
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold text-blue-500 mb-4">GameVerse</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Découvrez, suivez et organisez votre collection de jeux en toute simplicité.
            <br />
            <em className="text-gray-400 mt-4 block">"Le jeu n'est pas seulement un divertissement, c'est une aventure."</em>
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 bg-[#22262a] p-8 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0e0f10] border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Email"
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0e0f10] border border-gray-600 rounded-lg p-3 pr-12 text-white focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:-translate-y-1"
            >
                Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p className="mb-2">
              Pas encore inscrit ? <Link to="/register" className="text-blue-400 hover:underline">Créez un compte</Link>
            </p>
            <p>
              En continuant, vous acceptez nos <Link to="/terms" className="text-blue-400">Conditions</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;