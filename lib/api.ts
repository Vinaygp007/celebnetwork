// API configuration and integration for CelebNetwork frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types for API responses and requests
export interface User {
  id: string;
  email: string;
  role: 'fan' | 'celebrity' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  location?: string;
  bio?: string;
  interests?: string[];
  avatar?: string;
  coverPhoto?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Celebrity {
  id: string;
  firstName: string;
  lastName: string;
  stageName?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  industries: string[];
  socialMedia: string[];
  isVerified: boolean;
  followersCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Fan {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  location?: string;
  avatar?: string;
  interests: string[];
  favoriteCelebrities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: 'fan' | 'celebrity';
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  location?: string;
  stageName?: string;
  bio?: string;
  industries?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

// API error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization header if token exists
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('celebnetwork_token') 
    : null;
    
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text() as unknown as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

// Authentication API
export const authApi = {
  // Register a new user (fan or celebrity)
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token in localStorage
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('celebnetwork_token', response.accessToken);
    }
    
    return response;
  },

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token in localStorage
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('celebnetwork_token', response.accessToken);
    }
    
    return response;
  },

  // Logout user
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('celebnetwork_token');
    }
  },

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('celebnetwork_token');
  },

  // Get stored token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('celebnetwork_token');
  },
};

// Users API
export const usersApi = {
  // Get current user profile
  async getProfile(): Promise<User> {
    return apiRequest<User>('/users/profile');
  },

  // Get user by ID
  async getUser(id: string): Promise<User> {
    return apiRequest<User>(`/users/${id}`);
  },
};

// Celebrities API
export const celebritiesApi = {
  // Get all celebrities
  async getAll(): Promise<Celebrity[]> {
    return apiRequest<Celebrity[]>('/celebrities');
  },

  // Get featured celebrities
  async getFeatured(): Promise<Celebrity[]> {
    return apiRequest<Celebrity[]>('/celebrities/featured');
  },

  // Search celebrities
  async search(query: string): Promise<Celebrity[]> {
    return apiRequest<Celebrity[]>(`/celebrities/search?q=${encodeURIComponent(query)}`);
  },

  // Get celebrities by industry
  async getByIndustry(industry: string): Promise<Celebrity[]> {
    return apiRequest<Celebrity[]>(`/celebrities/industry/${encodeURIComponent(industry)}`);
  },

  // Get celebrity by ID
  async getById(id: string): Promise<Celebrity> {
    return apiRequest<Celebrity>(`/celebrities/${id}`);
  },

  // Update celebrity profile (protected)
  async update(id: string, data: Partial<Celebrity>): Promise<Celebrity> {
    return apiRequest<Celebrity>(`/celebrities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Fans API
export const fansApi = {
  // Get fan by ID
  async getById(id: string): Promise<Fan> {
    return apiRequest<Fan>(`/fans/${id}`);
  },

  // Get fan by user ID
  async getByUserId(userId: string): Promise<Fan> {
    return apiRequest<Fan>(`/fans/user/${userId}`);
  },

  // Update fan profile (protected)
  async update(id: string, data: Partial<Fan>): Promise<Fan> {
    return apiRequest<Fan>(`/fans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Add favorite celebrity (protected)
  async addFavorite(fanId: string, celebrityId: string): Promise<Fan> {
    return apiRequest<Fan>(`/fans/${fanId}/favorites/${celebrityId}`, {
      method: 'POST',
    });
  },

  // Remove favorite celebrity (protected)
  async removeFavorite(fanId: string, celebrityId: string): Promise<Fan> {
    return apiRequest<Fan>(`/fans/${fanId}/favorites/${celebrityId}`, {
      method: 'DELETE',
    });
  },
};

// Health check API
export const healthApi = {
  // Check API health
  async check(): Promise<{ status: string; uptime: number; timestamp: string }> {
    return apiRequest<{ status: string; uptime: number; timestamp: string }>('/health');
  },

  // Get API status
  async getStatus(): Promise<{ status: string; message: string; timestamp: string; version: string }> {
    return apiRequest<{ status: string; message: string; timestamp: string; version: string }>('/');
  },
};

// Utility functions
export const apiUtils = {
  // Format API errors for display
  formatError(error: unknown): string {
    if (error instanceof ApiError) {
      return error.message;
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  },

  // Check if error is authentication related
  isAuthError(error: unknown): boolean {
    return error instanceof ApiError && error.status === 401;
  },

  // Check if error is validation related
  isValidationError(error: unknown): boolean {
    return error instanceof ApiError && error.status === 400;
  },
};

// Export all APIs as default
const api = {
  auth: authApi,
  users: usersApi,
  celebrities: celebritiesApi,
  fans: fansApi,
  health: healthApi,
  utils: apiUtils,
};

export default api;
