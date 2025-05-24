import * as Keychain from 'react-native-keychain';
import { LoginCredentials, User } from '../types/auth';
import { api } from './api.service';

import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '@env';

const TOKEN_KEY = AUTH_STORAGE_KEY;
const USER_KEY = USER_STORAGE_KEY;

export class AuthService {
    static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);

            // Store the token securely
            await Keychain.setGenericPassword(TOKEN_KEY, response.token);
            api.setAuthToken(response.token);

            // Store user data securely
            await Keychain.setInternetCredentials(
                USER_KEY,
                'user',
                JSON.stringify(response.user)
            );

            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || 'Login failed. Please try again.');
            }
            // Fallback for non-Error responses
            throw new Error('Login failed. Contact support if the issue persists.');
        }
    }

    static async logout(): Promise<void> {
        try {
            // Call logout endpoint if needed
            await api.post('/auth/logout');
        } catch (error) {
            // Continue with local cleanup even if API call fails
            console.warn('Logout API call failed:', error);
        } finally {
            // Clear local storage
            await Keychain.resetGenericPassword();
            await Keychain.resetInternetCredentials({ server: USER_KEY });
            api.setAuthToken(null);
        }
    }

    static async getStoredAuth(): Promise<{ user: User | null; token: string | null }> {
        try {
            const [tokenCredentials, userCredentials] = await Promise.all([
                Keychain.getGenericPassword(),
                Keychain.getInternetCredentials(USER_KEY),
            ]);

            const token = tokenCredentials ? tokenCredentials.password : null;
            const user = userCredentials ? JSON.parse(userCredentials.password) : null;

            if (token) {
                api.setAuthToken(token);
            }

            // Validate token with the server
            if (token && user) {
                try {
                    await api.get('/auth/validate');
                } catch (error) {
                    // If token is invalid, clear storage and return null
                    await AuthService.logout();
                    return { user: null, token: null };
                }
            }

            return { user, token };
        } catch (error) {
            return { user: null, token: null };
        }
    }

    static async register(credentials: LoginCredentials & { name: string }): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post<{ user: User; token: string }>('/auth/register', credentials);

            // Store the token securely
            await Keychain.setGenericPassword(TOKEN_KEY, response.token);
            api.setAuthToken(response.token);

            // Store user data securely
            await Keychain.setInternetCredentials(
                USER_KEY,
                'user',
                JSON.stringify(response.user)
            );

            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || 'Registration failed. Please try again.');
            }
            // Fallback for non-Error responses
            throw new Error('Registration failed. Contact support if the issue persists.');
        }
    }
}
