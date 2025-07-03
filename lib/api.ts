// API configuration and integration for CelebNetwork frontend
// Make sure this matches where your backend is running
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com' 
  : 'http://localhost:3001'; // ✅ This should match your backend port

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
  console.log('🔥 Making API request to:', `${API_BASE_URL}${endpoint}`);
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...apiUtils.getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  console.log('🔥 Request config:', config);

  try {
    console.log('🔥 Attempting fetch...');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    console.log('🔥 Response status:', response.status);
    console.log('🔥 Response headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('🔥 Error response:', errorData);
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    console.log('🔥 JSON Response:', data);
    return data;
  } catch (error) {
    console.error('🔥 Fetch error:', error);
    throw error;
  }
}

// Auth API functions
export const authApi = {
  // Login
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    console.log('🔥 Making login request to:', `${API_BASE_URL}/api/auth/login`);
    
    const result = await apiRequest<AuthResponse>('/api/auth/login', { // ✅ Keep /api prefix
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token consistently
    if (result.accessToken) {
      localStorage.setItem('celebnetwork_token', result.accessToken);
    }

    return result;
  },

  // Fan signup
  signupFan: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    const result = await apiRequest<AuthResponse>('/api/auth/register', { // ✅ Keep /api prefix
      method: 'POST',
      body: JSON.stringify({
        ...data,
        role: 'fan',
      }),
    });
    
    if (result.accessToken) {
      localStorage.setItem('celebnetwork_token', result.accessToken);
    }

    return result;
  },

  // Celebrity signup
  signupCelebrity: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    stageName?: string;
    bio?: string;
    industries?: string[];
  }): Promise<AuthResponse> => {
    const result = await apiRequest<AuthResponse>('/api/auth/register', { // ✅ Keep /api prefix
      method: 'POST',
      body: JSON.stringify({
        ...data,
        role: 'celebrity',
      }),
    });
    
    if (result.accessToken) {
      localStorage.setItem('celebnetwork_token', result.accessToken);
    }

    return result;
  },

  // Logout
  logout: async (): Promise<void> => {
    apiUtils.clearAuth();
  },
};

// Users API functions
export const usersApi = {
  // Get current user profile
  getProfile: async (): Promise<User> => {
    return apiRequest<User>('/api/users/profile'); // ✅ Keep /api prefix
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiRequest<User>('/api/users/profile', { // ✅ Keep /api prefix
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    return apiRequest<User>(`/api/users/${id}`); // ✅ Keep /api prefix
  },
};

// Celebrity API functions
export const celebrityApi = {
  // Get all celebrities
  getAll: async (): Promise<Celebrity[]> => {
    return apiRequest<Celebrity[]>('/api/celebrities'); // ✅ Add /api prefix
  },

  // Get featured celebrities
  getFeatured: async (): Promise<Celebrity[]> => {
    return apiRequest<Celebrity[]>('/api/celebrities/featured'); // ✅ Add /api prefix
  },

  // Search celebrities
  search: async (query: string): Promise<Celebrity[]> => {
    return apiRequest<Celebrity[]>('/api/celebrities/search', { // ✅ Add /api prefix
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },

  // Get celebrity by ID
  getById: async (id: string): Promise<Celebrity> => {
    return apiRequest<Celebrity>(`/api/celebrities/${id}`); // ✅ Add /api prefix
  },
};

// Fans API functions
export const fansApi = {
  // Get all fans
  getAll: async (): Promise<Fan[]> => {
    return apiRequest<Fan[]>('/api/fans'); // ✅ Add /api prefix
  },

  // Get fan profile
  getProfile: async (): Promise<Fan> => {
    return apiRequest<Fan>('/api/fans/profile'); // ✅ Add /api prefix
  },

  // Get fan by ID
  getById: async (id: string): Promise<Fan> => {
    return apiRequest<Fan>(`/api/fans/${id}`); // ✅ Add /api prefix
  },

  // Update fan profile
  updateProfile: async (data: Partial<Fan>): Promise<Fan> => {
    return apiRequest<Fan>('/api/fans/profile', { // ✅ Add /api prefix
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Get fan's followed celebrities
  getFollowedCelebrities: async (): Promise<Celebrity[]> => {
    return apiRequest<Celebrity[]>('/api/fans/following'); // ✅ Add /api prefix
  },

  // Follow a celebrity
  followCelebrity: async (celebrityId: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>('/api/fans/follow', { // ✅ Add /api prefix
      method: 'POST',
      body: JSON.stringify({ celebrityId }),
    });
  },

  // Unfollow a celebrity
  unfollowCelebrity: async (celebrityId: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>('/api/fans/unfollow', { // ✅ Add /api prefix
      method: 'POST',
      body: JSON.stringify({ celebrityId }),
    });
  },
};

// Health check API
export const healthApi = {
  // Check API health
  check: async (): Promise<{ status: string; uptime: number; timestamp: string }> => {
    return apiRequest<{ status: string; uptime: number; timestamp: string }>('/api/health'); // ✅ Add /api prefix
  },

  // Get API status
  getStatus: async (): Promise<{ status: string; message: string; timestamp: string; version: string }> => {
    return apiRequest<{ status: string; message: string; timestamp: string; version: string }>('/api'); // ✅ Add /api prefix
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

  // Get auth token
  getAuthToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('celebnetwork_token');
    }
    return null;
  },

  // Get auth headers
  getAuthHeaders: () => {
    const token = apiUtils.getAuthToken();
    return token 
      ? { 'Authorization': `Bearer ${token}` }
      : {};
  },

  // Clear all stored auth data
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('celebnetwork_token');
    }
  },
};

// Default export with all API modules
const api = {
  auth: authApi,
  users: usersApi,
  celebrities: celebrityApi,
  fans: fansApi, // ✅ Now this will work
  health: healthApi,
  utils: apiUtils,
};

export default api;
