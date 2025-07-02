# Frontend Integration Guide

This guide shows how to integrate the CelebNetwork frontend with the production backend API.

## 🔗 Backend Integration

### Base Configuration

Update your frontend environment variables:

```env
# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### API Client Setup

Create an API client service:

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE;
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = \`Bearer \${this.token}\`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    return response.json();
  }

  // Authentication methods
  async register(userData: RegisterData) {
    const result = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (result.accessToken) {
      this.setToken(result.accessToken);
    }
    
    return result;
  }

  async login(credentials: LoginData) {
    const result = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (result.accessToken) {
      this.setToken(result.accessToken);
    }
    
    return result;
  }

  // Celebrity methods
  async getCelebrities() {
    return this.request('/celebrities');
  }

  async getFeaturedCelebrities() {
    return this.request('/celebrities/featured');
  }

  async searchCelebrities(query: string) {
    return this.request(\`/celebrities/search?q=\${encodeURIComponent(query)}\`);
  }

  async getCelebrity(id: string) {
    return this.request(\`/celebrities/\${id}\`);
  }

  async updateCelebrity(id: string, data: any) {
    return this.request(\`/celebrities/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // User methods
  async getUserProfile() {
    return this.request('/users/profile');
  }
}

export const apiClient = new ApiClient();

// Type definitions
export interface RegisterData {
  email: string;
  password: string;
  role: 'fan' | 'celebrity';
  firstName: string;
  lastName: string;
  stageName?: string;
  bio?: string;
  industries?: string[];
  location?: string;
  dateOfBirth?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
```

### Authentication Context

Update your auth context to use the real backend:

```typescript
// contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: 'fan' | 'celebrity' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiClient.setToken(token);
        const userProfile = await apiClient.getUserProfile();
        setUser(userProfile.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginData) => {
    const response = await apiClient.login(credentials);
    setUser(response.user);
  };

  const register = async (userData: RegisterData) => {
    const response = await apiClient.register(userData);
    setUser(response.user);
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Celebrity Search Hook

Create a hook for celebrity search:

```typescript
// hooks/useCelebrities.ts
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export function useCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCelebrities();
  }, []);

  const loadCelebrities = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getCelebrities();
      setCelebrities(data);
    } catch (err) {
      setError('Failed to load celebrities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchCelebrities = async (query: string) => {
    try {
      setLoading(true);
      const data = await apiClient.searchCelebrities(query);
      setCelebrities(data);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFeatured = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getFeaturedCelebrities();
      setCelebrities(data);
    } catch (err) {
      setError('Failed to load featured celebrities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    celebrities,
    loading,
    error,
    searchCelebrities,
    getFeatured,
    refreshCelebrities: loadCelebrities,
  };
}
```

### Page Updates

Update your pages to use the real API:

```typescript
// app/page.tsx (Homepage)
'use client';
import { useEffect, useState } from 'react';
import { useCelebrities } from '@/hooks/useCelebrities';

export default function HomePage() {
  const { celebrities, loading, getFeatured } = useCelebrities();

  useEffect(() => {
    getFeatured();
  }, []);

  if (loading) {
    return <div>Loading celebrities...</div>;
  }

  return (
    <div>
      <h1>Featured Celebrities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {celebrities.map((celebrity) => (
          <CelebrityCard key={celebrity.id} celebrity={celebrity} />
        ))}
      </div>
    </div>
  );
}
```

```typescript
// app/auth/login/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## 🧪 Testing Integration

Test the frontend-backend integration:

1. **Start both servers:**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run start:dev
   
   # Terminal 2: Frontend
   cd .. && npm run dev
   ```

2. **Test authentication flow:**
   - Register a new user
   - Login with credentials
   - Access protected pages

3. **Test celebrity features:**
   - View celebrity listings
   - Search for celebrities
   - View celebrity profiles

## 🚀 Deployment

For production deployment:

1. **Backend**: Deploy to AWS Lambda using `npm run deploy`
2. **Frontend**: Deploy to Vercel with updated environment variables
3. **Database**: Use managed PostgreSQL (AWS RDS, Supabase, etc.)

## 📝 Environment Variables

### Development
```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# Backend (.env)
FRONTEND_URL=http://localhost:3000
```

### Production
```env
# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_BASE_URL=https://your-api-domain.com

# Backend
FRONTEND_URL=https://your-frontend-domain.com
```

---

This integration guide ensures your frontend works seamlessly with the production backend API.
