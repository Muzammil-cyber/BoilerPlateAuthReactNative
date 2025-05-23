import { API_URL, API_TIMEOUT, AUTH_STORAGE_KEY, USER_STORAGE_KEY, ENABLE_BIOMETRIC } from '@env';

export const config = {
    api: {
        baseURL: API_URL,
        timeout: Number(API_TIMEOUT),
    },
    auth: {
        tokenKey: AUTH_STORAGE_KEY,
        userKey: USER_STORAGE_KEY,
    },
    features: {
        biometric: ENABLE_BIOMETRIC === 'true',
    },
} as const;

// Type-safe config access
export type Config = typeof config;
