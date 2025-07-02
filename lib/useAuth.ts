import { useState, useEffect } from 'react';
import { authApi, usersApi } from '@/lib/api';
import type { User, RegisterData } from '@/lib/api';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (!authApi.isLoggedIn()) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      // Get current user profile from backend
      const user = await usersApi.getProfile();
      
      console.log('Profile API response:', user);
      
      // If user data is incomplete or invalid, logout and redirect
      if (!user || !user.email) {
        console.warn('Invalid user data received, logging out');
        authApi.logout();
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      
      console.log('Setting authenticated user:', user);
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token might be invalid, clear it
      authApi.logout();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      
      console.log('Login API response:', response);
      
      // Ensure we have valid user data
      if (!response.user || !response.user.email) {
        throw new Error('Invalid user data received from server');
      }
      
      // Additional validation to check for test data
      const userData = response.user;
      console.log('Setting user data:', userData);
      
      setAuthState({
        user: userData,
        isLoading: false,
        isAuthenticated: true,
      });
      
      // Immediately fetch fresh user data from the profile endpoint to ensure consistency
      try {
        const freshUserData = await usersApi.getProfile();
        if (freshUserData && freshUserData.email) {
          console.log('Updating with fresh user data:', freshUserData);
          setAuthState(prev => ({
            ...prev,
            user: freshUserData
          }));
        }
      } catch (profileError) {
        console.warn('Failed to fetch fresh profile after login:', profileError);
        // Continue with login response data if profile fetch fails
      }
      
      return response;
    } catch (error) {
      console.error('Login error in useAuth:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      
      // Ensure we have valid user data
      if (!response.user || !response.user.email) {
        throw new Error('Invalid user data received from server');
      }
      
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authApi.logout();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const refreshUserData = async () => {
    if (!authApi.isLoggedIn()) return;
    
    try {
      const user = await usersApi.getProfile();
      if (user && user.email) {
        setAuthState(prev => ({
          ...prev,
          user
        }));
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuthStatus,
    refreshUserData,
  };
}
