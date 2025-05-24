import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// Initialize MMKV with encryption
export const mmkv = new MMKV({
    id: 'auth-storage',
    encryptionKey: 'my-secure-key', // In production, use a secure way to generate and store this key
});

// Create a storage interface for Zustand
export const storage: StateStorage = {
    setItem: (name, value) => {
        return mmkv.set(name, value);
    },
    getItem: (name) => {
        const value = mmkv.getString(name);
        return value ?? null;
    },
    removeItem: (name) => {
        return mmkv.delete(name);
    },
};
