'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  StarIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { authApi } from '@/lib/api';

export default function CelebrityDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!authApi.isLoggedIn()) {
      router.push('/auth/fan/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

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
              <span className="ml-2 text-sm bg-purple-600 text-white px-2 py-1 rounded">Celebrity</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">Celebrity Dashboard</h1>
          <p className="text-gray-300">Manage your profile and connect with fans</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-pink-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Followers</h3>
                <p className="text-2xl font-bold text-pink-400">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Profile Views</h3>
                <p className="text-2xl font-bold text-blue-400">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <StarIcon className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Rating</h3>
                <p className="text-2xl font-bold text-yellow-400">0.0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Engagement</h3>
                <p className="text-2xl font-bold text-green-400">0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Profile Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Profile Name</h4>
                  <p className="text-gray-300">Complete your profile to attract more fans</p>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Content & Posts</h3>
            <div className="space-y-4">
              <div className="text-center py-8">
                <PlusIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-300 mb-2">No content yet</h4>
                <p className="text-gray-400 mb-4">Share updates with your fans</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Complete Profile</h4>
              <p className="text-sm opacity-80">Add photos, bio, and contact info</p>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Verify Account</h4>
              <p className="text-sm opacity-80">Get verified celebrity status</p>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors text-left">
              <h4 className="font-semibold mb-1">Engage Fans</h4>
              <p className="text-sm opacity-80">Respond to messages and comments</p>
            </button>
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Analytics Overview</h3>
          <div className="text-center py-8">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Analytics Coming Soon</h4>
            <p className="text-gray-400">Track your profile performance and fan engagement</p>
          </div>
        </div>
      </main>
    </div>
  );
}
