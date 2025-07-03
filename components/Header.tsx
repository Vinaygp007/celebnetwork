'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Star, Users, Home, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from './UserMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    router.push('/auth/fan/login');
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              CelebNetwork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="/celebrities" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Celebrities</span>
            </Link>
            <Link 
              href="/explore" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Link 
                  href="/auth/fan/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Sign In
                </Link>
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <Link 
                href="/" 
                className="flex items-center space-x-2 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link 
                href="/celebrities" 
                className="flex items-center space-x-2 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="w-4 h-4" />
                <span>Celebrities</span>
              </Link>
              <Link 
                href="/explore" 
                className="flex items-center space-x-2 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4" />
                <span>Explore</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center space-x-2 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-4 h-4" />
                <span>About</span>
              </Link>
              
              {loading ? (
                <div className="py-2">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : isLoggedIn ? (
                <div className="pt-2 border-t border-gray-200">
                  <UserMenu />
                </div>
              ) : (
                <>
                  <div className="border-t border-gray-200 pt-2">
                    <Link 
                      href="/auth/fan/login"
                      className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={() => {
                        handleGetStarted();
                        setIsMenuOpen(false);
                      }}
                      className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}