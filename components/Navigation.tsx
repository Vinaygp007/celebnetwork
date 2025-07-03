'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SparklesIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/lib/useAuth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, refreshUserData } = useAuth();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Deterministic particle positions for consistent hydration
  const particlePositions = [
    { left: 20, top: 15, delay: 0, duration: 6 },
    { left: 80, top: 25, delay: 1, duration: 5 },
    { left: 60, top: 70, delay: 2, duration: 7 },
    { left: 30, top: 50, delay: 1.5, duration: 5.5 },
    { left: 90, top: 80, delay: 3, duration: 6.5 },
    { left: 10, top: 60, delay: 0.5, duration: 4.5 },
    { left: 70, top: 20, delay: 2.5, duration: 6 },
    { left: 45, top: 85, delay: 1.8, duration: 5.8 },
    { left: 85, top: 40, delay: 3.2, duration: 4.8 },
    { left: 15, top: 90, delay: 2.2, duration: 7.2 }
  ];

  // Auto-refresh user data periodically
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshUserData();
      }, 300000); // Refresh every 5 minutes

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshUserData]);

  // Handle scroll effect for navbar background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = currentScrollY / (documentHeight - windowHeight);
      
      // Always show navbar when near bottom of page (for footer visibility)
      if (scrollPercentage > 0.85) {
        setShowNav(true);
      } else {
        // Normal scroll behavior for the rest of the page
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past threshold
          setShowNav(false);
        } else {
          // Scrolling up or at top
          setShowNav(true);
        }
      }
      
      // Background blur effect
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Celebrities', href: '/celebrities', icon: '⭐' },
    { name: 'Join as Celebrity', href: '/celebrity/signup', icon: '✨' },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <>
      {/* Floating particles background - only render on client */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      )}

      {/* Fixed Navigation - Updated z-index and positioning */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-purple-100' 
            : 'bg-gradient-to-r from-white/90 via-purple-50/80 to-pink-50/90 backdrop-blur-lg'
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: showNav ? 0 : -100,
          opacity: showNav ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }} // Ensure proper positioning
      >
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <StarSolidIcon className="h-6 w-6 text-white animate-spin-slow" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
                    CelebNetwork
                  </h1>
                  <p className="text-xs text-gray-500 group-hover:text-purple-500 transition-colors duration-300">
                    ✨ Discover Magic
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center space-x-2">
                      <span className="text-lg group-hover:animate-bounce" style={{ animationDuration: '1s' }}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>

                    {isActive(item.href) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Auth Buttons / User Menu */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              {isAuthenticated && user ? (
                <>
                  {user.role !== 'celebrity' && (
                    <Link
                      href="/celebrity/login"
                      className="group relative px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 overflow-hidden rounded-full"
                    >
                      <span className="relative z-10">✨ Join as Celebrity</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                    </Link>
                  )}
                  
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="group relative flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></div>
                      
                      <span className="relative z-10 flex items-center space-x-2">
                        <UserCircleIcon className="h-5 w-5" />
                        <span>{getUserDisplayName()}</span>
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slideInLeft">
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                              {user.role === 'fan' ? '👤 Fan' : user.role === 'celebrity' ? '⭐ Celebrity' : '👑 Admin'}
                            </span>
                          </div>
                            
                          <Link
                            href={user.role === 'fan' ? '/dashboard/fan' : '/dashboard/celebrity'}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            📊 Dashboard
                          </Link>
                          
                          <Link
                            href="/profile"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            ⚙️ Profile Settings
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            🚪 Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/fan/login"
                    className="group relative px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 overflow-hidden rounded-full"
                  >
                    <span className="relative z-10">👤 Fan Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </Link>
                  
                  <Link
                    href="/celebrity/login"
                    className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></div>
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      <SparklesIcon className="h-4 w-4 group-hover:animate-spin" />
                      <span>Celebrity Login</span>
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <div className="relative">
                  {isOpen ? (
                    <XMarkIcon className="h-6 w-6 text-purple-600 group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen 
            ? 'max-h-screen opacity-100 bg-white/95 backdrop-blur-xl border-t border-purple-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-6 pb-8 space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl'
                    : 'bg-gradient-to-r from-gray-50 to-purple-50 text-gray-700 hover:from-purple-100 hover:to-pink-100 hover:text-purple-700'
                }`}
                onClick={() => setIsOpen(false)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                  animation: isOpen ? `slideInLeft 0.5s ease-out ${index * 100}ms both` : 'none'
                }}
              >
                <span className="text-2xl group-hover:animate-bounce" style={{ animationDuration: '1s' }}>
                  {item.icon}
                </span>
                <span className="font-semibold text-lg">{item.name}</span>
                
                <div className="ml-auto">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300"></div>
                </div>
              </Link>
            ))}
            
            <div className="pt-6 border-t border-purple-100 space-y-4">
              {isAuthenticated && user ? (
                <>
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <UserCircleIcon className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-purple-200 text-purple-800 rounded-full">
                          {user.role === 'fan' ? '👤 Fan' : user.role === 'celebrity' ? '⭐ Celebrity' : '👑 Admin'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={user.role === 'fan' ? '/dashboard/fan' : '/dashboard/celebrity'}
                    className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>📊</span>
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link
                    href="/profile"
                    className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-gray-100 to-purple-100 text-gray-700 font-semibold rounded-2xl hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>⚙️</span>
                    <span>Profile Settings</span>
                  </Link>
                  
                  {user.role !== 'celebrity' && (
                    <Link
                      href="/celebrity/login"
                      className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 font-semibold rounded-2xl hover:from-orange-100 hover:to-yellow-100 hover:text-orange-800 transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => setIsOpen(false)}
                    >
                      <SparklesIcon className="h-5 w-5" />
                      <span>Join as Celebrity</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 font-semibold rounded-2xl hover:from-red-200 hover:to-pink-200 hover:text-red-800 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/fan/login"
                    className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-gray-100 to-purple-100 text-gray-700 font-semibold rounded-2xl hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>👤</span>
                    <span>Fan Login</span>
                  </Link>
                  
                  <Link
                    href="/celebrity/login"
                    className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <SparklesIcon className="h-5 w-5 animate-pulse" />
                    <span>Celebrity Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content jumping */}
      <div className="h-20"></div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1s ease-in-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
    </>
  );
}