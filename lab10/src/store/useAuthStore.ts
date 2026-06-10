import { create } from 'zustand';
import { api } from '../api/api';
import type { AuthData, LoginResponse, User } from '../types/auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (data: AuthData) => Promise<void>;
  register: (data: AuthData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  login: async (data) => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.access_token);
    const userResponse = await api.get<User>('/auth/me');
    set({ user: userResponse.data });
  },

  register: async (data) => {
    await api.post('/auth/register', data);
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
