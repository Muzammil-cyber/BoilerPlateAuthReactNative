import { useAuthStore } from '../stores/auth.store';

export const useAuthSelectors = () => {
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const accessToken = useAuthStore((state) => state.accessToken);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const register = useAuthStore((state) => state.register);
    const initialize = useAuthStore((state) => state.initialize);

    return {
        isLoading,
        isAuthenticated,
        user,
        accessToken,
        login,
        logout,
        register,
        initialize,
    };
};
