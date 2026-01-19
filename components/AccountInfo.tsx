import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Game } from '../types';
import { extractErrorMessage } from '../utils/errorHandler';
import { SkeletonCard } from './common/SkeletonCard';
import { GameCard } from './common/GameCard';

const AccountInfo: React.FC = () => {
  const { user, logout, toggleGameInLibrary } = useAuth();
  const navigate = useNavigate();
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserGames = async () => {
      if (!user?.game_list || user.game_list.length === 0) {
        setUserGames([]);
        return;
      }
      
      setLoading(true);
      try {
        // Récupérer tous les jeux et filtrer par ceux dans la game_list
        const gameIds = user.game_list;
        const gamesPromises = gameIds.map(id => api.get(`/games/${id}`));
        const responses = await Promise.all(gamesPromises);
        const games = responses.map(res => res.data).filter(g => g !== null);
        setUserGames(games);
      } catch (e) {
        console.error("Erreur lors du chargement des jeux:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGames();
  }, [user?.game_list]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0e0f10] p-6 pt-24 max-w-4xl mx-auto">
      <div className="bg-[#1c1e22] rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl">
                {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{user?.username}</h1>
                <p className="text-gray-400">{user?.email}</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    En ligne
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0e0f10] p-6 rounded-xl border border-gray-800">
                <h3 className="text-gray-500 uppercase text-xs font-bold mb-4">Statistiques</h3>
                <div className="flex justify-between items-center mb-2">
                    <span>Jeux dans la collection</span>
                    <span className="text-blue-400 font-bold">{user?.game_list?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Avis donnés</span>
                    <span className="text-purple-400 font-bold">0</span>
                </div>
            </div>
            <div className="bg-[#0e0f10] p-6 rounded-xl border border-gray-800">
                <h3 className="text-gray-500 uppercase text-xs font-bold mb-4">Informations</h3>
                <p className="text-sm text-gray-400">Membre depuis le: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400 mt-2">ID: #{user?.user_id}</p>
            </div>
        </div>

        {/* Ma Bibliothèque de Jeux */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Ma Bibliothèque</h2>
            {user?.game_list && user.game_list.length > 0 && (
              <span className="text-gray-500 text-sm">({userGames.length} jeu{userGames.length > 1 ? 'x' : ''})</span>
            )}
          </div>

          {loading ? (
            <SkeletonCard count={8} variant="grid" />
          ) : userGames.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userGames.map(game => (
                <GameCard
                  key={game.game_id}
                  game={game}
                  showFavoriteButton
                  variant="grid"
                  isFavorite={true}
                  onFavoriteToggle={() => toggleGameInLibrary && toggleGameInLibrary(game.game_id)}
                  className="ring-green-500/50 border-2 border-green-500/30"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-[#0e0f10] rounded-xl border border-gray-800">
              <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z"></path>
              </svg>
              <p className="text-lg font-medium">Aucun jeu dans votre collection</p>
              <p className="text-sm mt-1">Découvrez et ajoutez des jeux en explorant notre catalogue</p>
              <Link to="/search" className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
                Parcourir le catalogue
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-800 pt-6">
            <button 
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-6 py-2 rounded-lg transition-colors font-medium"
            >
                Se déconnecter
            </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;