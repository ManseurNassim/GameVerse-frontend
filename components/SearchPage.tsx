import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Filters, Game } from '../types';
import { useAuth } from '../context/AuthContext';
import { DEBOUNCE } from '../utils/constants';
import { extractErrorMessage } from '../utils/errorHandler';
import { SkeletonCard } from './common/SkeletonCard';
import { GameCard } from './common/GameCard';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, toggleGameInLibrary } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [filters, setFilters] = useState<Filters | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({
    genres: [],
    platforms: [],
    themes: [],
    developers: [],
    publishers: []
  });
  const [filterSearch, setFilterSearch] = useState<{ [key: string]: string }>({
    genres: '',
    platforms: '',
    themes: '',
    developers: '',
    publishers: ''
  });
  const [filterMode, setFilterMode] = useState<{ [key: string]: 'AND' | 'OR' }>({
    genres: 'OR',
    platforms: 'OR',
    themes: 'OR',
    developers: 'OR',
    publishers: 'OR'
  });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const LIMIT = 50;
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // État pour l'autocomplétion
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Cache pour les suggestions et AbortController
  const suggestionsCache = useRef<{ [key: string]: Game[] }>({});
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchAbortControllerRef = useRef<AbortController | null>(null);

  // Traduction des catégories en français
  const categoryLabels: { [key: string]: string } = {
    genres: 'Genres',
    platforms: 'Plateformes',
    themes: 'Thèmes',
    developers: 'Développeurs',
    publishers: 'Éditeurs'
  };

  // Chargement des filtres disponibles
  useEffect(() => {
    const loadFilters = async () => {
        try {
            const res = await api.get('/games/filters');
            setFilters(res.data);
        } catch (e) {
            console.error("Erreur chargement filtres");
        }
    };
    loadFilters();
  }, []);

  // Autocomplétion avec debounce, cache et AbortController
  useEffect(() => {
    if (query.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        return;
    }

    // Vérifier le cache d'abord
    if (suggestionsCache.current[query]) {
        setSuggestions(suggestionsCache.current[query]);
        setShowSuggestions(true);
        setSelectedIndex(-1);
        return;
    }

    // Annuler la requête précédente
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoadingSuggestions(true);
    const timer = setTimeout(async () => {
        try {
            const res = await api.get('/games', { 
                params: { 
                    q: query, 
                    limit: 8 
                },
                signal: abortControllerRef.current?.signal
            });
            const data = Array.isArray(res.data) ? res.data : res.data.data || [];
            
            // Mettre en cache
            suggestionsCache.current[query] = data;
            
            setSuggestions(data);
            setShowSuggestions(true);
            setSelectedIndex(-1);
        } catch (e: any) {
            // Ne pas logger les erreurs d'annulation
            if (e.name !== 'AbortError') {
                console.error('Erreur autocomplétion');
            }
            setSuggestions([]);
        } finally {
            setLoadingSuggestions(false);
        }
    }, DEBOUNCE.autocomplete);

    return () => clearTimeout(timer);
  }, [query]);

  // Fermer les suggestions si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
            inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion du clavier pour naviguer les suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
            break;
        case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedIndex >= 0) {
                selectSuggestion(suggestions[selectedIndex]);
            }
            break;
        case 'Escape':
            setShowSuggestions(false);
            break;
    }
  };

  // Sélectionner une suggestion
  const selectSuggestion = (game: Game) => {
    navigate(`/game/${game.game_id}`);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

    // Fetch page helper avec AbortController
    const fetchPage = async (targetPage: number, append = false, signal?: AbortSignal) => {
        const params: any = {
            q: query,
            genres: activeFilters.genres.join(','),
            platforms: activeFilters.platforms.join(','),
            themes: activeFilters.themes.join(','),
            developers: activeFilters.developers.join(','),
            publishers: activeFilters.publishers.join(','),
            genresMode: filterMode.genres,
            platformsMode: filterMode.platforms,
            themesMode: filterMode.themes,
            developersMode: filterMode.developers,
            publishersMode: filterMode.publishers,
            page: targetPage,
            limit: LIMIT
        };
        
        const res = await api.get('/games', { params, signal });
        
        // API renvoie soit {data,total,...} soit un tableau (compat legacy)
        if (Array.isArray(res.data)) {
            setResults(append ? [...results, ...res.data] : res.data);
            setTotal(null);
        } else {
            const { data, total } = res.data;
            setResults(append ? [...results, ...data] : data);
            setTotal(total);
        }
    };

    // Recherche principale (reset page) - avec debounce, AbortController et limite minimale
    useEffect(() => {
        setPage(1);
        
        // Ne rechercher que si au moins 3 caractères ou recherche vide
        if (query.length > 0 && query.length < 3) {
            setResults([]);
            setTotal(null);
            return;
        }

        // Annuler la requête précédente
        if (searchAbortControllerRef.current) {
            searchAbortControllerRef.current.abort();
        }
        searchAbortControllerRef.current = new AbortController();

        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                await fetchPage(1, false, searchAbortControllerRef.current?.signal);
            } catch (e: any) {
                // Ne pas logger les erreurs d'annulation
                if (e.name !== 'AbortError') {
                    console.error('Search error');
                }
            } finally {
                setLoading(false);
            }
        }, DEBOUNCE.search); // Debounce pour éviter trop de requêtes
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, activeFilters]);

    // Réappliquer les filtres si le mode AND/OR change
    useEffect(() => {
        setPage(1);
        
        // Annuler la requête précédente
        if (searchAbortControllerRef.current) {
            searchAbortControllerRef.current.abort();
        }
        searchAbortControllerRef.current = new AbortController();

        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                await fetchPage(1, false, searchAbortControllerRef.current?.signal);
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    console.error('Search error');
                }
            } finally {
                setLoading(false);
            }
        }, 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterMode]);

    const loadMore = async () => {
        const next = page + 1;
        setLoadingMore(true);
        try {
            await fetchPage(next, true, searchAbortControllerRef.current?.signal);
            setPage(next);
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.error('Load more error');
            }
        } finally {
            setLoadingMore(false);
        }
    };

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
        const current = prev[category];
        const updated = current.includes(value) 
            ? current.filter(item => item !== value)
            : [...current, value];
        return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => {
      setActiveFilters({ genres: [], platforms: [], themes: [], developers: [], publishers: [] });
      setQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0e0f10] text-white flex flex-col pt-24">
        
        {/* Header Recherche & Navigation */}
        <div className="px-6 pb-6 border-b border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0e0f10]">
            <div className="flex items-center gap-4 w-full max-w-4xl">
                {/* Barre de Recherche avec Autocomplétion */}
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                        placeholder="Rechercher par Jeu, Développeur ou Éditeur..."
                        className="w-full bg-[#1c1e22] border border-gray-700 text-white py-3 pl-12 pr-4 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder-gray-500"
                    />
                    
                    {/* Dropdown Autocomplétion */}
                    {showSuggestions && query.length >= 2 && (
                        <div 
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 mt-2 bg-[#1c1e22] border border-gray-700 rounded-xl shadow-2xl shadow-blue-900/20 z-50 max-h-96 overflow-y-auto"
                        >
                            {loadingSuggestions ? (
                                <div className="px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    Chargement...
                                </div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((game, index) => (
                                    <button
                                        key={game.game_id}
                                        onClick={() => selectSuggestion(game)}
                                        className={`w-full px-4 py-3 flex items-center gap-3 transition-colors border-b border-gray-800 last:border-b-0 ${
                                            selectedIndex === index 
                                            ? 'bg-blue-600/20 text-blue-400' 
                                            : 'hover:bg-[#2a2f35] text-gray-300'
                                        }`}
                                    >
                                        {/* Miniature du jeu */}
                                        <div className="flex-shrink-0 w-10 h-14 rounded overflow-hidden bg-[#0e0f10]">
                                            <img 
                                                src={game.cover?.thumb} 
                                                alt={game.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Infos du jeu */}
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="font-semibold text-white text-sm truncate">
                                                {game.title}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {game.developers?.[0] || 'Développeur inconnu'}
                                            </p>
                                        </div>
                                        
                                        {/* Badge année */}
                                        {game.first_release_date && (
                                            <span className="flex-shrink-0 text-xs text-gray-500 bg-[#0e0f10] px-2 py-1 rounded">
                                                {new Date(game.first_release_date).getFullYear()}
                                            </span>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-gray-500 text-sm">
                                    Aucun jeu trouvé
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            <button 
                className="md:hidden w-full py-3 bg-blue-600 rounded-xl font-bold"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            >
                {showFiltersMobile ? 'Masquer Filtres' : 'Afficher Filtres'}
            </button>
        </div>

        <div className="flex flex-1">
            {/* Sidebar Filtres */}
            <aside className={`
                ${showFiltersMobile ? 'fixed inset-0 z-40 bg-[#0e0f10] p-6 overflow-y-auto pb-24' : 'hidden'} 
                md:block md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:w-72 md:p-6 md:border-r md:border-gray-800 md:overflow-y-auto bg-[#0e0f10] scrollbar-thin scrollbar-thumb-gray-700
            `}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold font-bebas text-white tracking-wide">Filtres</h3>
                </div>

                <button onClick={clearFilters} className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 mb-8 border border-blue-500/30 px-4 py-2 rounded-lg w-full transition-colors">
                    Réinitialiser tout
                </button>

                {filters && Object.entries(filters).map(([category, values]) => {
                    const searchTerm = filterSearch[category]?.toLowerCase() || '';
                    const filteredValues = (values as string[]).filter(val => 
                        val.toLowerCase().includes(searchTerm)
                    );
                    
                    return ['genres', 'platforms', 'themes', 'developers', 'publishers'].includes(category) && (
                        <div key={category} className="mb-8">
                            <div className="flex items-center justify-between mb-2 border-b border-gray-800 pb-2">
                                <h4 className="font-bold uppercase text-xs text-gray-500 tracking-wider">{categoryLabels[category] || category}</h4>
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={filterSearch[category] || ''}
                                    onChange={(e) => setFilterSearch({ ...filterSearch, [category]: e.target.value })}
                                    className="w-24 bg-[#1c1e22] border border-gray-700 text-white text-xs px-2 py-1 rounded focus:border-blue-500 focus:outline-none placeholder-gray-500"
                                />
                            </div>
                            <div className="flex gap-1 mb-2">
                                <button
                                    onClick={() => setFilterMode({ ...filterMode, [category]: 'OR' })}
                                    className={`text-[10px] px-2 py-1 rounded font-bold transition-colors ${
                                        filterMode[category] === 'OR' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-[#1c1e22] text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    OU
                                </button>
                                <button
                                    onClick={() => setFilterMode({ ...filterMode, [category]: 'AND' })}
                                    className={`text-[10px] px-2 py-1 rounded font-bold transition-colors ${
                                        filterMode[category] === 'AND' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-[#1c1e22] text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    ET
                                </button>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {filteredValues.length > 0 ? filteredValues.map(val => (
                                    <label key={val} className="flex items-center gap-3 cursor-pointer group p-1 rounded hover:bg-[#1c1e22] transition-colors">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${activeFilters[category]?.includes(val) ? 'bg-blue-600 border-blue-600' : 'border-gray-600 group-hover:border-blue-500'}`}>
                                            {activeFilters[category]?.includes(val) && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            )}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            checked={activeFilters[category]?.includes(val)}
                                            onChange={() => toggleFilter(category, val)}
                                            className="hidden"
                                        />
                                        <span className={`text-sm ${activeFilters[category]?.includes(val) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>{val}</span>
                                    </label>
                                )) : (
                                    <p className="text-xs text-gray-500 italic">Aucun résultat</p>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                            {/* Bouton fixe en bas pour fermer les filtres sur mobile */}
                            {showFiltersMobile && (
                                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0e0f10] via-[#0e0f10] to-transparent md:hidden">
                                    <button 
                                        onClick={() => setShowFiltersMobile(false)}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Retour
                                    </button>
                                </div>
                            )}
            </aside>

            {/* Résultats */}
            <main className="flex-1 p-6 bg-[#0e0f10]">
                <div className="mb-6 flex items-end justify-between">
                    <h2 className="text-2xl font-bold text-white">Résultats <span className="text-gray-500 text-lg font-normal">({results.length}{total ? ` / ${total}` : ''})</span></h2>
                </div>

                {loading ? (
                    <SkeletonCard count={10} variant="grid" />
                ) : results.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-4">
                            {results.map(game => {
                                const isAdded = user?.game_list?.includes(game.game_id);
                                return (
                                    <GameCard
                                        key={game.game_id}
                                        game={game}
                                        showFavoriteButton
                                        variant="grid"
                                        isFavorite={isAdded || false}
                                        onFavoriteToggle={() => user && toggleGameInLibrary(game.game_id)}
                                        className={isAdded ? 'ring-green-500/50 border-2 border-green-500/30' : ''}
                                    />
                                );
                            })}
                        </div>
                        {(total === null || results.length < (total || 0)) && (
                            <div className="flex justify-center py-8">
                                <button
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-lg font-bold"
                                >
                                    {loadingMore ? 'Chargement...' : 'Charger plus'}
                                </button>
                            </div>
                        )}
                    </>
                ) : query.length > 0 && query.length < 3 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <svg className="w-16 h-16 mb-4 opacity-30 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <p className="text-xl font-medium">Continuez votre recherche</p>
                        <p className="text-sm mt-2 text-gray-400">Tapez au moins 3 caractères pour commencer</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-xl font-medium">Aucun jeu trouvé.</p>
                        <p className="text-sm mt-2">Essayez de modifier vos filtres ou votre recherche.</p>
                    </div>
                )}
            </main>
        </div>

                {/* Bouton flottant pour remonter (masqué quand les filtres mobile sont ouverts) */}
                {!showFiltersMobile && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        title="Remonter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                )}
    </div>
  );
};

export default SearchPage;