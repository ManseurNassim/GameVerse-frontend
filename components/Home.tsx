import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Game } from '../types';
import CategoryColumn from './CategoryColumn';
import afficheBg from '../assets/images/affiche3.jpg';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  const [gamesByCategory, setGamesByCategory] = useState<{ [key: string]: Game[] }>({});
  const [autoSlideTrigger, setAutoSlideTrigger] = useState(0);

  useEffect(() => {
    const fetchRandomCategories = async () => {
        try {
            const genresRes = await api.get('/games/random-genres');
            const randomGenres = genresRes.data;
            setCategories(randomGenres);
            
            const gamesPromises = randomGenres.map((genre: string) =>
                api.get('/games/category', { params: { category: genre } })
            );
            
            const gamesResults = await Promise.all(gamesPromises);
            
            const gamesData: { [key: string]: Game[] } = {};
            randomGenres.forEach((genre: string, index: number) => {
                gamesData[genre] = gamesResults[index].data;
            });
            
            setGamesByCategory(gamesData);
        } catch (e) {
            console.error("Failed to fetch games");
        }
    };
    fetchRandomCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setAutoSlideTrigger(prev => prev + 1), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-10 bg-[#0e0f10] min-h-screen text-white font-roboto">
      <section className="relative w-full h-[40vh] md:h-[45vh] flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0f10]/60 to-[#0e0f10]"></div>
        <img src={afficheBg} alt="Bannière GameVerse" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
        <div className="relative z-10 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold font-bebas mb-1 leading-tight">Explorez. Jouez. Partagez.</h1>
            <p className="text-gray-400 text-xs md:text-sm max-w-xs md:max-w-none mx-auto">Votre bibliothèque de jeux ultime.</p>
        </div>
      </section>

      <section className="px-4 md:px-8 max-w-7xl mx-auto -mt-12 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {categories.map((category) => (
                <CategoryColumn 
                    key={category}
                    title={category.toUpperCase()} 
                    games={gamesByCategory[category] || []} 
                    autoSlideTrigger={autoSlideTrigger} 
                    userGameList={user?.game_list}
                />
            ))}
        </div>
      </section>
    </div>
  );
};
export default Home;