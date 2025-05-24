import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, LoginCredentials } from '../types/auth';
import { AuthService } from '../services/auth.service';

const initialState: AuthState = {
    isLoading: true,
    isAuthenticated: true,
    accessToken: null,
    user: null,
};

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    login: async () => { },
    logout: async () => { },
    register: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const { user, token } = await AuthService.getStoredAuth();

            setState({
                isLoading: false,
                isAuthenticated: !!token,
                accessToken: token,
                user,
            });
        } catch (error) {
            setState({
                ...initialState,
                isLoading: false,
            });
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            const { user, token } = await AuthService.login(credentials);
            setState({
                isLoading: false,
                isAuthenticated: true,
                accessToken: token,
                user,
            });
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        await AuthService.logout();
        setState({
            isLoading: false,
            isAuthenticated: false,
            accessToken: null,
            user: null,
        });
    };

    const register = async (credentials: LoginCredentials & { name: string }) => {
        try {
            const { user, token } = await AuthService.register(credentials);
            setState({
                isLoading: false,
                isAuthenticated: true,
                accessToken: token,
                user,
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
            }}
        >
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
