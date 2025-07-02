'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  StarIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { authApi, celebritiesApi } from '@/lib/api';
import type { Celebrity } from '@/lib/api';

export default function FanDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [featuredCelebrities, setFeaturedCelebrities] = useState<Celebrity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    if (!authApi.isLoggedIn()) {
      router.push('/auth/fan/login');
      return;
    }

    // Load featured celebrities
    loadFeaturedCelebrities();
  }, [router]);

  const loadFeaturedCelebrities = async () => {
    try {
      const celebrities = await celebritiesApi.getFeatured();
      setFeaturedCelebrities(celebrities);
    } catch (error) {
      console.error('Error loading featured celebrities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <StarIcon className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-xl font-bold text-white">CelebNetwork</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search celebrities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to your Dashboard!</h1>
          <p className="text-gray-300">Discover and connect with your favorite celebrities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-pink-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Following</h3>
                <p className="text-2xl font-bold text-pink-400">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <StarIcon className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Favorites</h3>
                <p className="text-2xl font-bold text-yellow-400">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Profile Views</h3>
                <p className="text-2xl font-bold text-blue-400">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Celebrities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Celebrities</h2>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCelebrities.map((celebrity) => (
              <div
                key={celebrity.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                  {celebrity.avatar && (
                    <img
                      src={celebrity.avatar}
                      alt={celebrity.firstName}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">
                      {celebrity.stageName || `${celebrity.firstName} ${celebrity.lastName}`}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {celebrity.industries.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  {celebrity.isVerified && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-500 rounded-full p-1">
                        <StarIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span>{celebrity.followersCount.toLocaleString()} followers</span>
                      <span>★ {celebrity.rating}/5</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>

          {featuredCelebrities.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No celebrities found</h3>
              <p className="text-gray-400">Check back later for featured celebrities!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Explore Celebrities</h4>
              <p className="text-sm opacity-80">Discover new celebrities to follow</p>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Update Profile</h4>
              <p className="text-sm opacity-80">Complete your fan profile</p>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Join Communities</h4>
              <p className="text-sm opacity-80">Connect with other fans</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
