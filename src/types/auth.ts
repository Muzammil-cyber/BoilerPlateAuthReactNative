export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    user: User | null;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    register: (credentials: LoginCredentials & { name: string }) => Promise<void>;
}
