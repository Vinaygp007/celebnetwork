// Type definitions for API responses and requests
export interface User {
  id: string;
  email: string;
  role: 'fan' | 'celebrity' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Celebrity {
  id: string;
  user: User;
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
  user: User;
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

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: 'fan' | 'celebrity';
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | string;
  location?: string;
  stageName?: string;
  bio?: string;
  industries?: string[];
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
