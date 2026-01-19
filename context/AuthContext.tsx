import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { User } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, username: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleGameInLibrary: (gameId: number) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper pour initialiser l'état utilisateur depuis le token
  const setUserFromToken = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      setUser(prev => ({
        ...prev,
        user_id: decoded.user_id,
        username: decoded.username,
        email: decoded.email,
        createdAt: decoded.createdAt,
        game_list: prev?.game_list || decoded.game_list || [] 
      }));
      // On recharge le profil complet pour avoir la game_list à jour depuis la DB
      refreshUserProfile();
    } catch (e) {
      console.error("Invalid token", e);
      setUser(null);
    }
  };

  const refreshUserProfile = async () => {
      try {
          const res = await api.get('/user/me');
          setUser(prev => ({ ...prev, ...res.data }));
      } catch (e) {
          console.error("Failed to refresh user profile", e);
      }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get('/auth/status');
        
        if (response.data.newAccessToken) {
            localStorage.setItem('accessToken', response.data.newAccessToken);
            setUserFromToken(response.data.newAccessToken);
        } else if (response.data.isConnected && token) {
            setUserFromToken(token);
        } else {
            setUser(null);
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (user_email: string, user_pass: string) => {
    try {
      const response = await api.post('/auth/login_process', { user_email, user_pass });
      const { data: accessToken } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      setUserFromToken(accessToken);
    } catch (error: any) {
        const msg = error.response?.data?.message || 'Login failed';
        throw new Error(msg);
    }
  };

  const register = async (user_email: string, user_username: string, user_pass: string) => {
      try {
          await api.post('/auth/register', { user_email, user_username, user_pass });
      } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Registration failed');
      }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  // Gestion des favoris connecté au Back
  const toggleGameInLibrary = async (gameId: number) => {
    if (!user) return;

    // Optimistic Update
    const isInLibrary = user.game_list?.includes(gameId);
    let newList;
    if (isInLibrary) {
        newList = user.game_list?.filter(id => id !== gameId) || [];
    } else {
        newList = [...(user.game_list || []), gameId];
    }
    const previousList = user.game_list;
    setUser({ ...user, game_list: newList });

    try {
        await api.post('/user/library/toggle', { gameId });
    } catch (error) {
        // Rollback
        console.error("Failed to toggle game in DB", error);
        setUser({ ...user, game_list: previousList });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, toggleGameInLibrary, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};