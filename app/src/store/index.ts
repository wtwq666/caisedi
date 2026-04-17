import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

export * from './trainingStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin123') {
          set({
            user: {
              id: '1',
              username: 'admin',
              role: 'admin',
              name: '管理员',
            },
            isAuthenticated: true,
          });
          return true;
        }
        if (username === 'user' && password === 'user123') {
          set({
            user: {
              id: '2',
              username: 'user',
              role: 'user',
              name: '普通用户',
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
