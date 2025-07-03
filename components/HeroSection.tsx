'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Users, Heart, Sparkles, ArrowRight } from 'lucide-react';

export function HeroSection() {
  const [userType, setUserType] = useState<'fan' | 'celebrity'>('fan');
  const router = useRouter();

  const handleGetStarted = () => {
    if (userType === 'fan') {
      router.push('/auth/fan/signup');
    } else {
      router.push('/auth/celebrity/signup');
    }
  };

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-60"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Connect with Your Favorite Stars
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Where{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fans
            </span>
            {' '}Meet{' '}
            <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              Stars
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform connecting fans with celebrities. Get exclusive content, 
            personal messages, and unforgettable experiences.
          </p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setUserType('fan')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                  userType === 'fan'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">I'm a Fan</span>
              </button>
              <button
                onClick={() => setUserType('celebrity')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                  userType === 'celebrity'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Star className="w-5 h-5" />
                <span className="font-medium">I'm a Celebrity</span>
              </button>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            onClick={handleGetStarted}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started as {userType === 'fan' ? 'Fan' : 'Celebrity'}
            <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Active Fans</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Celebrities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
            <div className="text-gray-600">Connections Made</div>
          </div>
        </div>
      </div>
    </section>
  );
}