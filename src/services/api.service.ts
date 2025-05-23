interface ApiConfig {
    baseURL: string;
    headers?: Record<string, string>;
}

class ApiService {
    private baseURL: string;
    private headers: Record<string, string>;

    constructor(config: ApiConfig) {
        this.baseURL = config.baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
    }

    setAuthToken(token: string | null) {
        if (token) {
            this.headers.Authorization = `Bearer ${token}`;
        } else {
            delete this.headers.Authorization;
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Network response was not ok');
        }
        return response.json();
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: this.headers,
        });
        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.headers,
        });
        return this.handleResponse<T>(response);
    }
}

// Create and export a singleton instance
import { API_URL, API_TIMEOUT } from '@env';

export const api = new ApiService({
    baseURL: API_URL,
    headers: {
        'timeout': API_TIMEOUT,
    },
});

export default ApiService;
