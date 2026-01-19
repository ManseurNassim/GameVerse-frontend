import axios, { AxiosInstance } from 'axios';
import { Game, Filters } from '../types';
import { mockData } from './mockData';

// CONFIGURATION
const USE_REAL_API = true;
const API_BASE_URL = 'http://localhost:5001';
const MOCK_DELAY = 300;

// MOCK SERVICE
const mockService = {
  users: [{ email: 'test@test.com', pass: 'password', username: 'DemoUser', user_id: 1, createdAt: new Date().toISOString(), game_list: [] }],

  filterGames: (games: Game[], params: any) => {
    let filtered = [...games];
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(g => 
          g.title.toLowerCase().includes(q) ||
          g.developers.some(d => d.toLowerCase().includes(q)) ||
          g.publishers.some(p => p.toLowerCase().includes(q))
      );
    }
    if (params.genres) filtered = filtered.filter(g => params.genres.split(',').some((i: string) => g.genres.fr?.includes(i)));
    if (params.platforms) filtered = filtered.filter(g => params.platforms.split(',').some((p: string) => g.platforms.includes(p)));
    if (params.themes) filtered = filtered.filter(g => params.themes.split(',').some((t: string) => g.themes?.fr?.includes(t)));
    if (params.category) filtered = filtered.filter(g => g.genres.fr?.includes(params.category));
    return filtered;
  },

  handleRequest: async (method: string, url: string, data?: any, config?: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    
    // Auth mocks
    if (url === '/auth/status') {
         const token = localStorage.getItem('accessToken');
         return { data: { isConnected: !!token, newAccessToken: token } };
    }
    if (url === '/auth/login_process') {
        const u = mockService.users.find(u => u.email === data.user_email && u.pass === data.user_pass);
        if (u) {
            const token = btoa(JSON.stringify({ user_id: u.user_id, username: u.username, email: u.email, game_list: u.game_list }));
            return { data: { data: `${token}.fake` } };
        }
        throw { response: { data: { message: "Identifiants invalides" } } };
    }
    if (url === '/auth/register') {
        mockService.users.push({ ...data, user_id: Math.floor(Math.random()*1000), createdAt: new Date().toISOString(), game_list: [] });
        return { data: { message: "Ok" } };
    }
    if (url === '/auth/logout') return { data: { message: "Ok" } };
    
    // User mocks
    if (url === '/user/me') return { data: mockService.users[0] }; 
    if (url === '/user/library/toggle') {
        const u = mockService.users[0];
        const idx = u.game_list.indexOf(data.gameId);
        if (idx === -1) u.game_list.push(data.gameId);
        else u.game_list.splice(idx, 1);
        return { data: { message: "Toggled", game_list: u.game_list } };
    }

    // Game mocks
    if (url === '/games/popular') return { data: [...mockData.games].sort((a,b) => (b.added||0)-(a.added||0)).slice(0, 20) };
    if (url === '/games/category') {
        const f = mockService.filterGames(mockData.games, config?.params || {});
        return { data: f.sort(() => 0.5 - Math.random()).slice(0, 5) };
    }
    if (url.includes('/games/search')) return { data: mockService.filterGames(mockData.games, config?.params || {}) };
    if (url === '/filters') {
        const extract = (key: string, sub?: string) => [...new Set(mockData.games.flatMap((g: any) => sub ? g[key]?.[sub] : g[key]))].filter(Boolean).sort();
        return { data: {
            genres: extract('genres', 'fr'), platforms: extract('platforms'), themes: extract('themes', 'fr'), developers: extract('developers'), publishers: extract('publishers')
        }};
    }
    const idMatch = url.match(/\/games\/(\d+)$/);
    if (idMatch) return { data: mockData.games.find(g => g.game_id === parseInt(idMatch[1])) };

    return { data: {} };
  }
};

// REAL AXIOS CLIENT
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// MAIN EXPORT
const api = {
  get: (url: string, config?: any) => USE_REAL_API ? axiosClient.get(url, config) : mockService.handleRequest('get', url, null, config),
  post: (url: string, data: any) => USE_REAL_API ? axiosClient.post(url, data) : mockService.handleRequest('post', url, data),
  put: (url: string, data: any) => USE_REAL_API ? axiosClient.put(url, data) : mockService.handleRequest('put', url, data),
  delete: (url: string) => USE_REAL_API ? axiosClient.delete(url) : mockService.handleRequest('delete', url),
} as AxiosInstance;

export default api;