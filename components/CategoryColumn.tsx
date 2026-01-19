import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { useAuth } from '../context/AuthContext';
import FavoriteButton from './FavoriteButton';

interface CategoryColumnProps {
    title: string;
    games: Game[];
    autoSlideTrigger: number;
    userGameList?: number[];
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ title, games, autoSlideTrigger, userGameList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const { toggleGameInLibrary } = useAuth();

    const changeImage = (direction: 'next' | 'prev') => {
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => {
            if (direction === 'next') return (prev + 1) % games.length;
            return (prev - 1 + games.length) % games.length;
        });
    };

    useEffect(() => {
        if (games.length > 1) {
            changeImage('next');
        }
    }, [autoSlideTrigger]);

    const handleManualChange = (e: React.MouseEvent, direction: 'next' | 'prev') => {
        e.preventDefault();
        e.stopPropagation();
        changeImage(direction);
    };

    if (games.length === 0) return <div className="h-48 md:h-96 bg-[#1c1e22] rounded-xl flex items-center justify-center text-gray-500 animate-pulse text-xs">Chargement...</div>;

    const currentGame = games[currentIndex];


    return (
        <div className="flex flex-col items-center w-full max-w-[200px] sm:max-w-xs md:max-w-xs mx-auto relative group/column">
            <h3 className="text-base md:text-lg font-bold font-bebas mb-3 tracking-wider text-white uppercase bg-[#0e0f10]/80 px-3 py-1 rounded backdrop-blur-sm border border-gray-800 md:bg-transparent md:border-none md:p-0 shadow-lg">{title}</h3>
            
            <div className={`relative w-full aspect-[3/4.2] bg-[#1c1e22] rounded-xl overflow-hidden shadow-2xl group border cursor-pointer isolate transition-all duration-300 ${currentGame && userGameList?.includes(currentGame.game_id) ? 'border-green-500/50 ring-1 ring-green-500/50' : 'border-white/5 ring-1 ring-white/10'}`}>
                
                {/* Flèches de navigation */}
                <button onClick={(e) => handleManualChange(e, 'prev')} className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm md:opacity-0 md:group-hover/column:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={(e) => handleManualChange(e, 'next')} className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm md:opacity-0 md:group-hover/column:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {games.map((game, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isPrev = idx === prevIndex;
                    
                    let zClass = 'z-0';
                    let opacityClass = 'opacity-0';
                    let pointerEvents = 'pointer-events-none';
                    
                    if (isCurrent) {
                        zClass = 'z-20';
                        opacityClass = 'opacity-100';
                        pointerEvents = 'pointer-events-auto';
                    } else if (isPrev) {
                        zClass = 'z-10'; 
                        opacityClass = 'opacity-100';
                    }

                    return (
                        <div key={game.game_id} className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${zClass} ${opacityClass} ${pointerEvents}`}>
                             <Link to={`/game/${game.game_id}`} className="block w-full h-full relative group/card">
                                <img src={game.cover.original} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-110"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-4 md:p-6">
                                    <h4 className="text-base md:text-xl font-bold text-white leading-tight transform translate-y-0 md:translate-y-4 md:group-hover/card:translate-y-0 transition-transform duration-500 ease-out drop-shadow-lg mb-4 md:mb-0">
                                        {game.title}
                                    </h4>
                                </div>
                            </Link>
                        </div>
                    );
                })}

                <FavoriteButton 
                    gameId={currentGame.game_id} 
                    size="md" 
                    className="absolute bottom-2 right-2 z-30"
                />

                <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1.5 z-20 pointer-events-none">
                    {games.map((_, idx) => (
                        <div key={idx} className={`h-1 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-blue-500 w-3 md:w-4' : 'bg-gray-500/50 w-1.5'}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryColumn;