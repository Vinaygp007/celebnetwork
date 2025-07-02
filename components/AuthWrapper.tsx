'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, refreshUserData } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // For real users, periodically refresh data to ensure consistency
      const lastRefresh = localStorage.getItem('last_user_refresh');
      const now = Date.now();
      
      if (!lastRefresh || (now - parseInt(lastRefresh)) > 300000) { // Refresh every 5 minutes
        refreshUserData();
        localStorage.setItem('last_user_refresh', now.toString());
      }
    }
  }, [user, isAuthenticated, refreshUserData]);

  return <>{children}</>;
}
