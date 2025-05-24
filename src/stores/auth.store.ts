import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState, LoginCredentials } from '../types/auth';
import { AuthService } from '../services/auth.service';
import { storage } from '../services/storage.service';

interface AuthStore extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    register: (credentials: LoginCredentials & { name: string }) => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLoading: true,
            isAuthenticated: false,
            accessToken: null,
            user: null,

            initialize: async () => {
                try {
                    const { user, token } = await AuthService.getStoredAuth();
                    set({
                        isLoading: false,
                        isAuthenticated: !!token,
                        accessToken: token,
                        user,
                    });
                } catch (error) {
                    set({
                        isLoading: false,
                        isAuthenticated: false,
                        accessToken: null,
                        user: null,
                    });
                }
            },

            login: async (credentials) => {
                try {
                    const { user, token } = await AuthService.login(credentials);
                    set({
                        isLoading: false,
                        isAuthenticated: true,
                        accessToken: token,
                        user,
                    });
                } catch (error) {
                    throw error;
                }
            },

            logout: async () => {
                await AuthService.logout();
                set({
                    isLoading: false,
                    isAuthenticated: false,
                    accessToken: null,
                    user: null,
                });
            },

            register: async (credentials) => {
                try {
                    const { user, token } = await AuthService.register(credentials);
                    set({
                        isLoading: false,
                        isAuthenticated: true,
                        accessToken: token,
                        user,
                    });
                } catch (error) {
                    throw error;
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => storage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
            }),
        }
    )
);
