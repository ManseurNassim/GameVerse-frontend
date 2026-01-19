import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../types';
import FavoriteButton from '../FavoriteButton';

interface GameCardProps {
  game: Game;
  variant?: 'grid' | 'list';
  showFavoriteButton?: boolean;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'grid',
  showFavoriteButton = false,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/game/${game.game_id}`);
  };

  if (variant === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className={`flex items-center gap-4 p-4 bg-[#1c1e22] rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer group ${className}`}
      >
        <img
          src={game.cover?.thumb || game.cover?.original}
          alt={game.title}
          className="w-16 h-24 object-cover rounded shadow-md border border-gray-700 group-hover:shadow-lg group-hover:shadow-blue-900/20 transition-all"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {game.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">{game.developers?.[0]}</p>
          {game.genres?.fr && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {game.genres.fr.slice(0, 2).map(g => (
                <span key={g} className="text-xs font-bold text-gray-400 bg-[#2a2f35] px-1.5 py-0.5 rounded">
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
        {showFavoriteButton && (
          <FavoriteButton gameId={game.game_id} size="sm" />
        )}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div
      onClick={handleCardClick}
      className={`group flex flex-col bg-[#1c1e22] rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 border border-white/5 ring-1 ring-white/10 cursor-pointer ${className}`}
    >
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative bg-[#15171a]">
        <img
          src={game.cover?.original || game.cover?.thumb}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Favorite Button */}
        {showFavoriteButton && (
          <FavoriteButton gameId={game.game_id} size="md" className="absolute top-2 right-2 z-10" />
        )}

        {/* Overlay with Title (appears on hover on desktop, always on mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-4 md:p-6">
          <h3 className="font-bold text-sm md:text-base text-white line-clamp-2 leading-tight transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-lg">
            {game.title}
          </h3>
          {game.developers?.[0] && (
            <p className="text-xs text-gray-300 mt-1 line-clamp-1">{game.developers[0]}</p>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3 flex flex-col flex-1 justify-between hidden md:flex">
        <div>
          <h3 className="font-bold text-xs text-white line-clamp-2 leading-tight mb-1 group-hover:text-blue-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-[10px] text-gray-500 line-clamp-1">{game.developers?.[0]}</p>
        </div>
        {game.genres?.fr && (
          <div className="mt-2 flex flex-wrap gap-1">
            {game.genres.fr.slice(0, 2).map(g => (
              <span key={g} className="text-[8px] uppercase font-bold text-gray-400 bg-[#2a2f35] px-1.5 py-0.5 rounded">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
