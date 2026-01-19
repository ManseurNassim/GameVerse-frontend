import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Game } from '../types';
import { ERROR_MESSAGES } from '../utils/constants';
import DetailCard from './DetailCard';
import FavoriteButton from './FavoriteButton';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/games/${id}`);
        setGame(res.data);
        if (res.data.videos && res.data.videos.length > 0) {
            const match = res.data.videos[0].match(/v=([^&]+)/);
            if (match) setVideoKey(match[1]);
        }
      } catch (err) {
        setError(ERROR_MESSAGES.games.loadError);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGame();
  }, [id]);

  if (loading) return <div className="text-center mt-40 text-white text-xl">Chargement...</div>;
  if (error || !game) return <div className="text-center mt-40 text-red-500 text-xl">{error || ERROR_MESSAGES.games.notFound}</div>;

  const bgImage = game.artworks?.[0]?.original || game.cover.original;
  
  const getMultiArray = (list?: { fr?: string[], en?: string[] }) => list?.fr || list?.en;

  return (
    <div className="min-h-screen bg-[#0e0f10] pb-20 relative font-roboto">

      <div className="relative w-full h-[20vh] md:h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0e0f10]/30 to-[#0e0f10] z-10"></div>
        <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-50 blur-sm" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-4 md:mt-0">
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold font-bebas text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] tracking-wide leading-tight">{game.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-30 -mt-6 md:-mt-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex-shrink-0 w-full lg:w-80 flex flex-row lg:flex-col items-start lg:items-center gap-4">
                <div className={`relative w-32 md:w-48 lg:w-80 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl flex-shrink-0 transition-all duration-300 ${user?.game_list?.includes(game!.game_id) ? 'border-4 border-green-500/50' : 'border-2 md:border-4 border-[#22262a]'} bg-[#1c1e22]`}>
                    <img src={game.cover.original} alt={game.title} className="w-full h-full object-cover"/>
                    <FavoriteButton 
                      gameId={game.game_id} 
                      size="lg" 
                      className="absolute bottom-2 right-2"
                    />
                </div>
                <div className="flex-1 lg:w-full lg:text-center pt-2">
                     <p className="text-gray-400 text-xs md:text-sm uppercase font-bold tracking-wider mb-1">Date de sortie</p>
                     <p className="text-white font-medium">{new Date(game.release_date).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="flex-1 lg:mt-6">
                <div className="bg-[#1c1e22] p-4 md:p-6 rounded-xl border border-blue-900/30 mb-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                    <h2 className="text-blue-500 font-bold mb-2 uppercase text-sm tracking-wider">Description</h2>
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed whitespace-pre-line">
                        {game.description?.fr || game.description?.en || "Aucune description disponible."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8">
                    <DetailCard 
                        title="Développeurs & Éditeurs" 
                        items={Array.from(new Set([...(game.developers || []), ...(game.publishers || [])]))} 
                        type="tags" 
                    />
                    <DetailCard title="Plateformes" items={game.platforms} type="tags" />
                    <DetailCard title="Genres" items={getMultiArray(game.genres)} type="tags" />
                    <DetailCard title="Modes" items={getMultiArray(game.game_modes)} type="tags" />
                    <DetailCard title="Thèmes" items={getMultiArray(game.themes)} type="tags" />
                    <DetailCard title="Moteur" items={game.game_engines} type="tags" emptyText="Non spécifié" />
                </div>

                {videoKey && (
                    <div className="bg-[#1c1e22] rounded-xl border border-gray-800 mb-8 overflow-hidden">
                        <div className="bg-[#15171a] px-4 py-2 border-b border-gray-800"><h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">Trailer</h3></div>
                        <div className="aspect-video w-full">
                            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoKey}`} title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
export default GameDetails;