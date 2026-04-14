import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Fabric, User } from '@/types';
import { initialFabrics } from '@/data/fabrics';
import syntheticFabrics from '@/data/fabrics-extended';
import blendedFabricsPart1 from '@/data/fabrics-blended';
import blendedFabricsPart2 from '@/data/fabrics-blended-part2';

// 合并所有面料数据
const allFabrics: Fabric[] = [
  ...initialFabrics,
  ...syntheticFabrics,
  ...blendedFabricsPart1,
  ...blendedFabricsPart2
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

interface FabricState {
  fabrics: Fabric[];
  currentFabric: Fabric | null;
  addFabric: (fabric: Omit<Fabric, 'id'>) => void;
  updateFabric: (id: string, fabric: Partial<Fabric>) => void;
  deleteFabric: (id: string) => void;
  setCurrentFabric: (fabric: Fabric | null) => void;
  getFabricById: (id: string) => Fabric | undefined;
}

// 认证状态
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string, password: string) => {
        // 简单认证：管理员账号 admin/admin123
        if (username === 'admin' && password === 'admin123') {
          set({
            user: {
              id: '1',
              username: 'admin',
              role: 'admin',
              name: '管理员'
            },
            isAuthenticated: true
          });
          return true;
        }
        // 普通用户账号 user/user123
        if (username === 'user' && password === 'user123') {
          set({
            user: {
              id: '2',
              username: 'user',
              role: 'user',
              name: '普通用户'
            },
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

// 面料状态
export const useFabricStore = create<FabricState>()(
  persist(
    (set, get) => ({
      fabrics: allFabrics,
      currentFabric: null,
      addFabric: (fabric) => {
        const newFabric: Fabric = {
          ...fabric,
          id: Date.now().toString()
        };
        set((state) => ({
          fabrics: [...state.fabrics, newFabric]
        }));
      },
      updateFabric: (id, updates) => {
        set((state) => ({
          fabrics: state.fabrics.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          )
        }));
      },
      deleteFabric: (id) => {
        set((state) => ({
          fabrics: state.fabrics.filter((f) => f.id !== id)
        }));
      },
      setCurrentFabric: (fabric) => {
        set({ currentFabric: fabric });
      },
      getFabricById: (id) => {
        return get().fabrics.find((f) => f.id === id);
      }
    }),
    {
      name: 'fabric-storage'
    }
  )
);
