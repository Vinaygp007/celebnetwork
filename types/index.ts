export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'fan' | 'celebrity';
  profileImage?: string;
  bio?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Celebrity extends User {
  stageName: string;
  category: string;
  followers: number;
  rating: number;
  price: string;
  services: Service[];
  socialMedia: SocialMedia;
}

export interface Fan extends User {
  favoriteCategories?: string[];
  followedCelebrities?: string[];
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  duration?: string;
  type: 'message' | 'video' | 'call' | 'meet';
}

export interface SocialMedia {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  facebook?: string;
  website?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  userType: 'fan' | 'celebrity';
}