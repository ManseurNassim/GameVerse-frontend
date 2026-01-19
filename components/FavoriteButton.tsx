import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface FavoriteButtonProps {
  gameId: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId, size = 'md', className = '' }) => {
  const { user, isAuthenticated, toggleGameInLibrary } = useAuth();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isAdded = user?.game_list?.includes(gameId);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      setIsAnimating(true);
      toggleGameInLibrary(gameId);
      setTimeout(() => setIsAnimating(false), 150);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 h-7 w-7',
    md: 'p-2 h-9 w-9',
    lg: 'p-3 h-12 w-12'
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };

  return (
    <button 
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center bg-blue-600 hover:bg-blue-500 ${className}`}
      title={isAdded ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <div className={`favorite-button-icon flex items-center justify-center ${isAnimating ? 'animate' : ''}`}>
        {isAdded ? (
          <span className={`text-white font-bold ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-sm'}`}>−</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSizeClasses[size]} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default FavoriteButton;
