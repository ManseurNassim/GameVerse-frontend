import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Game } from '../types';
import { useAuth } from '../context/AuthContext';

const RankingPage: React.FC = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [displayGames, setDisplayGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [allThemes, setAllThemes] = useState<string[]>([]);
  const [platformGroups, setPlatformGroups] = useState<{[key: string]: string[]}>({});
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [expandedPlatformGroup, setExpandedPlatformGroup] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, toggleGameInLibrary } = useAuth();

  // Regroupement des plateformes par famille
  const groupPlatforms = (platforms: string[]) => {
    const groups: {[key: string]: string[]} = {
      'Nintendo': [],
      'PlayStation': [],
      'Xbox': [],
      'PC': [],
      'Mobile': [],
      'Retro': []
    };

    platforms.forEach(plat => {
      const lower = plat.toLowerCase();
      if (lower.includes('nintendo') || lower.includes('game boy') || lower.includes('wii') || 
          lower.includes('switch') || lower.includes('nes') || lower.includes('snes') ||
          lower.includes('n64') || lower.includes('gamecube') || lower.includes('3ds') || lower.includes('ds')) {
        groups['Nintendo'].push(plat);
      } else if (lower.includes('playstation') || lower.includes('ps') || lower.includes('psp') || lower.includes('vita')) {
        groups['PlayStation'].push(plat);
      } else if (lower.includes('xbox') || lower.includes('360')) {
        groups['Xbox'].push(plat);
      } else if (lower.includes('pc') || lower.includes('windows') || lower.includes('mac') || 
                 lower.includes('linux') || lower.includes('steam')) {
        groups['PC'].push(plat);
      } else if (lower.includes('android') || lower.includes('ios') || lower.includes('mobile') ||
                 lower.includes('iphone') || lower.includes('ipad')) {
        groups['Mobile'].push(plat);
      } else if (lower.includes('atari') || lower.includes('commodore') || lower.includes('amiga') ||
                 lower.includes('sega') || lower.includes('neo geo') || lower.includes('dreamcast') ||
                 lower.includes('coleco') || lower.includes('msx')) {
        groups['Retro'].push(plat);
      } else {
        // Autres -> mettre dans Retro
        groups['Retro'].push(plat);
      }
    });

    // Supprimer les groupes vides
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) delete groups[key];
    });

    return groups;
  };

  // Limiter les genres aux plus populaires (basé sur le nombre de jeux par genre)
  const getTopGenres = (games: Game[], limit: number = 12) => {
    const genreCount: {[key: string]: number} = {};
    games.forEach(g => {
      g.genres.fr?.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    return Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([genre]) => genre);
  };

  // Obtenir tous les genres triés par popularité
  const getAllGenresSorted = (games: Game[]) => {
    const genreCount: {[key: string]: number} = {};
    games.forEach(g => {
      g.genres.fr?.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    return Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);
  };

  // Limiter les thèmes aux plus populaires
  const getTopThemes = (games: Game[], limit: number = 12) => {
    const themeCount: {[key: string]: number} = {};
    games.forEach(g => {
      g.themes?.fr?.forEach(theme => {
        themeCount[theme] = (themeCount[theme] || 0) + 1;
      });
    });
    return Object.entries(themeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([theme]) => theme);
  };

  // Obtenir tous les thèmes triés par popularité
  const getAllThemesSorted = (games: Game[]) => {
    const themeCount: {[key: string]: number} = {};
    games.forEach(g => {
      g.themes?.fr?.forEach(theme => {
        themeCount[theme] = (themeCount[theme] || 0) + 1;
      });
    });
    return Object.entries(themeCount)
      .sort((a, b) => b[1] - a[1])
      .map(([theme]) => theme);
  };

  const [loadingGames, setLoadingGames] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
        try {
            // Charger JUSTE les filtres (ultra rapide) via la route /filters
            const res = await api.get('/games/filters');
            const { genres, platforms, themes } = res.data;
            
            // Limiter les genres et thèmes aux top 12
            const topGenres = genres.slice(0, 12);
            const topThemes = themes.slice(0, 12);
            
            setCategories(topGenres);
            setAllCategories(genres);
            setThemes(topThemes);
            setAllThemes(themes);
            setPlatformGroups(groupPlatforms(platforms));

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    fetchFilters();
  }, []);

  // Fonction de filtrage et tri pour le classement
  const applyRanking = async (type: 'genre' | 'theme' | 'platformGroup' | 'platform', value: string, platformsList?: string[]) => {
      // Définir le filtre IMMÉDIATEMENT (avant même le chargement)
      // Afficher juste le nom pour l'UI (avant la parenthèse)
      const displayValue = value.split('(')[0].trim();
      
      if (type === 'genre') {
          setCurrentFilter(`Genre : ${displayValue}`);
      } else if (type === 'theme') {
          setCurrentFilter(`Thème : ${displayValue}`);
      } else {
          setCurrentFilter(`${displayValue}`);
      }

      // Scroll IMMÉDIATEMENT vers les résultats
      setTimeout(() => {
          document.getElementById('ranking-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);

      setLoadingGames(true);
      setDisplayGames([]);
      try {
          let filtered: Game[] = [];
          
          // Envoyer le thème COMPLET (avec description) au backend
          if (type === 'genre') {
              const res = await api.get('/games', { params: { genres: value, limit: 10, sortBy: 'added', sortOrder: 'desc' } });
              filtered = res.data.data || res.data;
          } else if (type === 'theme') {
              const res = await api.get('/games', { params: { themes: value, limit: 10, sortBy: 'added', sortOrder: 'desc' } });
              filtered = res.data.data || res.data;
          } else if (type === 'platformGroup') {
              const res = await api.get('/games', { params: { platforms: platformsList?.join(','), limit: 10, sortBy: 'added', sortOrder: 'desc' } });
              filtered = res.data.data || res.data;
          } else {
              const res = await api.get('/games', { params: { platforms: value, limit: 10, sortBy: 'added', sortOrder: 'desc' } });
              filtered = res.data.data || res.data;
          }

          setDisplayGames(filtered);
      } catch (error) {
          console.error('Erreur lors du chargement des jeux:', error);
      } finally {
          setLoadingGames(false);
      }
  };

  if (loading) return <div className="min-h-screen bg-[#0e0f10] flex items-center justify-center text-white">Chargement...</div>;

  const top3 = displayGames.slice(0, 3);
  const restOfGames = displayGames.slice(3);

  return (
    <div className="min-h-screen bg-[#0e0f10] text-white font-roboto relative">
        {/* Image de fond gaming avec overlay sombre */}
        <div className="fixed inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80" 
                alt="Gaming Background" 
                className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f10]/95 via-[#0e0f10]/90 to-[#0e0f10]"></div>
        </div>

        <div className="max-w-7xl mx-auto pt-24 pb-20 px-4 relative z-10">
            
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bebas text-white mb-4 uppercase">Centre de Classements</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Sélectionnez une catégorie ci-dessous pour voir les jeux les plus populaires et les mieux notés.
                </p>
            </div>

            {/* HUB DE SÉLECTION (Toujours visible) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
                
                {/* Par Genres */}
                <div className="bg-[#1c1e22] p-6 rounded-xl border border-gray-800">
                    <h3 className="text-2xl font-bebas text-white mb-6 border-l-4 border-blue-500 pl-3">
                        Par Genres 
                        <span className="text-sm font-normal text-gray-400 ml-2">(Les plus populaires)</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {(showAllGenres ? allCategories : categories).map(cat => (
                            <button 
                                key={cat}
                                onClick={() => applyRanking('genre', cat)}
                                className={`text-xs md:text-sm p-3 rounded-lg text-left transition-all flex justify-between items-center group
                                    ${currentFilter === `Genre : ${cat}` ? 'bg-blue-600 text-white' : 'bg-[#0e0f10] hover:bg-[#2a2f35] text-gray-300 border border-gray-700'}
                                `}
                            >
                                <span className="font-medium truncate mr-2">{cat}</span>
                            </button>
                        ))}
                    </div>
                    {!showAllGenres && allCategories.length > 12 && (
                        <button
                            onClick={() => setShowAllGenres(true)}
                            className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors"
                        >
                            Voir tous les genres ({allCategories.length})
                        </button>
                    )}
                    {showAllGenres && (
                        <button
                            onClick={() => setShowAllGenres(false)}
                            className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors"
                        >
                            Voir moins
                        </button>
                    )}
                </div>

                {/* Par Thèmes */}
                <div className="bg-[#1c1e22] p-6 rounded-xl border border-gray-800">
                    <h3 className="text-2xl font-bebas text-white mb-6 border-l-4 border-green-500 pl-3">
                        Par Thèmes 
                        <span className="text-sm font-normal text-gray-400 ml-2">(Les plus populaires)</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {(showAllThemes ? allThemes : themes).map(theme => (
                            <button 
                                key={theme}
                                onClick={() => applyRanking('theme', theme)}
                                className={`text-xs md:text-sm p-3 rounded-lg text-left transition-all flex justify-between items-center group
                                    ${currentFilter === `Thème : ${theme}` ? 'bg-green-600 text-white' : 'bg-[#0e0f10] hover:bg-[#2a2f35] text-gray-300 border border-gray-700'}
                                `}
                            >
                                <span className="font-medium truncate mr-2">{theme}</span>
                            </button>
                        ))}
                    </div>
                    {!showAllThemes && allThemes.length > 12 && (
                        <button
                            onClick={() => setShowAllThemes(true)}
                            className="w-full py-2 text-sm text-green-400 hover:text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
                        >
                            Voir tous les thèmes ({allThemes.length})
                        </button>
                    )}
                    {showAllThemes && (
                        <button
                            onClick={() => setShowAllThemes(false)}
                            className="w-full py-2 text-sm text-green-400 hover:text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
                        >
                            Voir moins
                        </button>
                    )}
                </div>

                {/* Par Plateformes */}
                <div className="bg-[#1c1e22] p-6 rounded-xl border border-gray-800">
                    <h3 className="text-2xl font-bebas text-white mb-6 border-l-4 border-purple-500 pl-3">Par Familles de Plateformes</h3>
                    <div className="space-y-3">
                        {Object.entries(platformGroups).map(([groupName, platformsList]) => (
                            <div key={groupName} className="border border-gray-700 rounded-lg overflow-hidden">
                                {/* Bouton famille */}
                                <button 
                                    onClick={() => applyRanking('platformGroup', groupName, platformsList)}
                                    className={`w-full text-xs md:text-sm p-3 text-left transition-all flex justify-between items-center group
                                        ${currentFilter === groupName ? 'bg-purple-600 text-white' : 'bg-[#0e0f10] hover:bg-[#2a2f35] text-gray-300'}
                                    `}
                                >
                                    <span className="font-medium mr-2">{groupName}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs opacity-60">({platformsList.length})</span>
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedPlatformGroup(expandedPlatformGroup === groupName ? null : groupName);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setExpandedPlatformGroup(expandedPlatformGroup === groupName ? null : groupName);
                                                }
                                            }}
                                            className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                        >
                                            <svg 
                                                className={`w-4 h-4 transition-transform ${expandedPlatformGroup === groupName ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                                
                                {/* Détail des plateformes */}
                                {expandedPlatformGroup === groupName && (
                                    <div className="bg-[#15171a] p-3 grid grid-cols-2 gap-2 border-t border-gray-700">
                                        {platformsList.map(plat => (
                                            <button
                                                key={plat}
                                                onClick={() => applyRanking('platform', plat)}
                                                className={`text-xs p-2 rounded text-left transition-all hover:bg-[#2a2f35] ${
                                                    currentFilter === plat ? 'bg-purple-500 text-white' : 'text-gray-400'
                                                }`}
                                            >
                                                {plat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RÉSULTATS DU CLASSEMENT (Visible uniquement après sélection) */}
            {currentFilter && (
                <div id="ranking-results" className="animate-fade-in-up relative">
                    {/* Image de fond pour les résultats */}
                    <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80" 
                            alt="Ranking Background" 
                            className="w-full h-full object-cover opacity-5"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0f10]/50 to-[#0e0f10]"></div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-12 pt-8">
                         <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-500"></div>
                         <h2 className="text-3xl font-bebas text-blue-400 uppercase tracking-wider">{currentFilter}</h2>
                         <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-500"></div>
                    </div>

                    {/* SPINNER DE CHARGEMENT */}
                    {loadingGames ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="relative w-16 h-16 mb-4">
                                <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-400 text-lg">Chargement des meilleurs jeux...</p>
                        </div>
                    ) : displayGames.length > 0 ? (
                        <>
                            {/* PODIUM TOP 3 */}
                            {top3.length > 0 && (
                                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-12 mb-20 px-4">
                                    {/* 2ème place */}
                                    {top3[1] && <PodiumCard game={top3[1]} rank={2} color="bg-gray-400" height="h-48" />}
                                    
                                    {/* 1ère place */}
                                    {top3[0] && <PodiumCard game={top3[0]} rank={1} color="bg-yellow-500" height="h-64" isFirst />}
                                    
                                    {/* 3ème place */}
                                    {top3[2] && <PodiumCard game={top3[2]} rank={3} color="bg-orange-600" height="h-40" />}
                                </div>
                            )}

                            {/* TABLEAU CLASSEMENT (Reste) */}
                            {restOfGames.length > 0 && (
                                <div className="mb-20">
                            <div className="bg-[#1c1e22] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 bg-blue-600/10 p-4 text-gray-300 font-bold text-sm uppercase tracking-wider items-center border-b border-blue-600/30">
                                    <div className="col-span-2 md:col-span-1 text-center">Rang</div>
                                    <div className="col-span-6 md:col-span-4">Jeu</div>
                                    <div className="col-span-4 hidden md:block text-center">Développeur</div>
                                    <div className="col-span-4 md:col-span-3 text-right pr-4">Année</div>
                                </div>

                                {/* Rows */}
                                {restOfGames.map((game, index) => (
                                    <div key={game.game_id} className="grid grid-cols-12 p-4 border-b border-gray-800 items-center hover:bg-[#22262a] transition-colors group">
                                        <div className="col-span-2 md:col-span-1 text-center font-bold text-gray-500 text-lg">#{index + 4}</div>
                                        <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                                            <img src={game.cover.thumb} alt="" className="w-12 h-16 object-cover rounded shadow-md border border-gray-700" />
                                            <Link to={`/game/${game.game_id}`} className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {game.title}
                                            </Link>
                                        </div>
                                        <div className="col-span-4 hidden md:block text-center text-sm text-gray-400">
                                            {game.developers?.[0] || '-'}
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right pr-4 text-sm text-gray-500 font-mono">
                                            {new Date(game.release_date).getFullYear()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-10">Aucun jeu trouvé pour ce classement.</div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

// Carte Podium : Titre SOUS l'image pour lisibilité maximale
const PodiumCard = ({ game, rank, color, height, isFirst }: { game: Game, rank: number, color: string, height: string, isFirst?: boolean }) => (
    <div className={`flex flex-col items-center w-full md:w-1/3 relative group ${isFirst ? '-mt-10' : ''}`}>
        
        {/* Badge Rang */}
        <div className={`absolute -top-5 z-20 ${color} text-white font-bold w-12 h-12 flex items-center justify-center rounded-xl shadow-lg text-2xl transform rotate-45 border-4 border-[#0e0f10]`}>
            <span className="transform -rotate-45">#{rank}</span>
        </div>
        
        {/* Carte Image */}
        <Link to={`/game/${game.game_id}`} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-[#22262a] group-hover:border-white/40 transition-all transform group-hover:-translate-y-2 z-10 bg-[#1c1e22] block">
            <img src={game.cover.original} alt={game.title} className="w-full h-full object-cover" />
        </Link>

        {/* Titre (Hors de l'image pour éviter de cacher) */}
        <div className="mt-4 text-center px-2 z-20">
             <h3 className={`font-bold leading-tight ${isFirst ? 'text-xl text-yellow-400' : 'text-lg text-white'}`}>
                {game.title}
             </h3>
        </div>
        
        {/* Socle Visuel (Effet néon) */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] ${height} -z-0 ${color} opacity-20 rounded-b-xl blur-2xl`}></div>
    </div>
);

export default RankingPage;