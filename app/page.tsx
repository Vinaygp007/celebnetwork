'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { 
  StarIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  SparklesIcon, 
  HeartIcon,
  TrophyIcon,
  BoltIcon
} from '@heroicons/react/24/solid';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Advanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const headerOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const featuredCelebrities = [
    {
      id: 1,
      name: "Luna Chen",
      category: "K-Pop Sensation",
      fans: "12.3M",
      image: "🎤",
      gradient: "from-pink-500 via-purple-500 to-indigo-600"
    },
    {
      id: 2,
      name: "Marcus Sterling",
      category: "Hollywood Legend",
      fans: "25.7M",
      image: "🎬",
      gradient: "from-blue-500 via-cyan-500 to-teal-600"
    },
    {
      id: 3,
      name: "Aria Blackwood",
      category: "Visionary Speaker",
      fans: "8.9M",
      image: "💫",
      gradient: "from-amber-500 via-orange-500 to-red-600"
    }
  ];

  const stats = [
    { label: "Global Celebrities", value: "50K+", icon: "⭐" },
    { label: "Active Fans", value: "100M+", icon: "❤️" },
    { label: "Countries", value: "195", icon: "🌍" },
    { label: "Live Events", value: "25K+", icon: "🎉" }
  ];

  const testimonials = [
    {
      name: "Jessica Williams",
      role: "Celebrity Manager",
      text: "CelebNetwork revolutionized how we connect with fans. The AI insights are incredible!",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Alex Rodriguez",
      role: "Music Producer",
      text: "Found amazing talent through this platform. It&apos;s like having a crystal ball for entertainment!",
      rating: 5,
      image: "🎵"
    },
    {
      name: "Sarah Chen",
      role: "Die-hard Fan",
      text: "I can finally connect with my idols in meaningful ways. This platform is pure magic!",
      rating: 5,
      image: "🌟"
    }
  ];

  const features = [
    {
      icon: <BoltIcon className="w-6 h-6" />,
      title: "AI-Powered Discovery",
      description: "Revolutionary AI that understands natural language to find perfect celebrity matches"
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with stars from every continent, culture, and entertainment genre"
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Intelligent algorithms that connect fans with their perfect celebrity matches"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(testimonialInterval);
    };
  }, [mouseX, mouseY, testimonials.length]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Simplified Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black" />
        
        {/* Aurora Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-cyan-400/30 animate-pulse" />
        </div>

        {/* Floating Orbs - Reduced */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full mix-blend-screen filter blur-xl"
            style={{
              background: `radial-gradient(circle, ${
                ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'][i % 8]
              }40, transparent)`,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Streamlined */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            style={{ y: textY, scale: headerScale, opacity: headerOpacity }}
            className="max-w-6xl mx-auto text-center"
          >
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {/* Pre-title */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl text-purple-300 font-medium">
                      <SparklesIcon className="w-4 h-4 mr-2 animate-spin" />
                      Welcome to the Future of Entertainment
                    </span>
                  </motion.div>

                  {/* Main Headline - Optimized Size */}
                  <motion.h1 
                    className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                  >
                    <motion.span 
                      className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      CELEB
                    </motion.span>
                    <motion.span 
                      className="block bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                      style={{
                        textShadow: '0 0 60px rgba(168, 85, 247, 0.4)'
                      }}
                    >
                      NETWORK
                    </motion.span>
                  </motion.h1>

                  {/* Simplified Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mb-10"
                  >
                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                      Where <span className="text-purple-400 font-bold">Global Superstars</span> meet{' '}
                      <span className="text-pink-400 font-bold">Devoted Fans</span> in the{' '}
                      <span className="text-cyan-400 font-bold">Ultimate Entertainment Universe</span>
                    </p>
                  </motion.div>

                  {/* Simplified Search Box */}
                  <motion.div 
                    className="max-w-4xl mx-auto mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
                      
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-xl">
                        <div className="flex items-center">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="✨ Try: 'Korean pop star' or 'Funny action actor'..."
                              className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-300 text-lg focus:outline-none font-medium"
                            />
                          </div>
                          <motion.button 
                            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2 relative overflow-hidden group/btn"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <SparklesIcon className="w-5 h-5 relative z-10 group-hover/btn:animate-spin" />
                            <span className="relative z-10">Discover</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Streamlined Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    <Link href="/celebrities">
                      <motion.button 
                        className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden min-w-[280px]"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                          <UserGroupIcon className="w-6 h-6 group-hover:animate-pulse" />
                          <span>Explore Universe</span>
                          <SparklesIcon className="w-5 h-5 group-hover:animate-spin" />
                        </div>
                      </motion.button>
                    </Link>

                    <Link href="/celebrity/signup">
                      <motion.button 
                        className="group relative px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold text-lg rounded-xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 min-w-[280px] hover:border-white/60"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                          <StarIcon className="w-6 h-6 group-hover:animate-spin text-yellow-400" />
                          <span>Become a Star</span>
                          <TrophyIcon className="w-5 h-5 group-hover:animate-bounce text-yellow-400" />
                        </div>
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Compact Stats */}
                  <motion.div 
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.4 }}
                  >
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        className="text-center relative"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                          <div className="text-3xl mb-2">{stat.icon}</div>
                          <motion.div 
                            className="text-2xl lg:text-3xl font-black text-white mb-1"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-gray-300 font-medium text-sm">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white/50 text-center">
              <div className="text-xs mb-2">Scroll to explore</div>
              <div className="w-5 h-8 border border-white/30 rounded-full mx-auto relative">
                <motion.div
                  className="w-1 h-2 bg-white rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Celebrities - Compact */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-black text-white mb-4"
                style={{ textShadow: '0 0 60px rgba(168, 85, 247, 0.3)' }}
              >
                FEATURED <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">SUPERSTARS</span>
              </motion.h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Meet the global icons who are redefining entertainment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCelebrities.map((celebrity, index) => (
                <motion.div 
                  key={celebrity.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${celebrity.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500`}></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 h-full group-hover:border-white/50 transition-all duration-300">
                    <div className="text-center">
                      <motion.div 
                        className={`w-20 h-20 bg-gradient-to-r ${celebrity.gradient} rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-xl relative`}
                        whileHover={{ scale: 1.1, rotateZ: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="relative z-10">{celebrity.image}</span>
                      </motion.div>
                      <h3 className="text-xl font-black text-white mb-1">{celebrity.name}</h3>
                      <p className="text-purple-300 font-bold text-sm">{celebrity.category}</p>
                      <div className="flex items-center justify-center space-x-1 mt-2">
                        <HeartIcon className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-white font-bold">{celebrity.fans}</span>
                        <span className="text-gray-400 text-sm">fans</span>
                      </div>
                    </div>

                    <motion.button 
                      className={`w-full bg-gradient-to-r ${celebrity.gradient} text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/btn mt-4`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">View Profile</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features - Compact */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                WHY <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">CHOOSE US</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Experience the most advanced celebrity discovery platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-xl relative"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative z-10 text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-xl font-black text-white mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial - Single, Compact */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-6xl font-black text-white mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              SUCCESS <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">STORIES</span>
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30">
                  <div className="text-4xl mb-4">{testimonials[currentTestimonial].image}</div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-white font-light italic mb-6 leading-relaxed">
                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </blockquote>
                  
                  <div className="text-purple-300 font-bold text-lg mb-1">
                    — {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Compact */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
              
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-12 border border-white/40">
                <motion.h2 
                  className="text-4xl md:text-6xl font-black text-white mb-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  READY TO <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">SHINE</span>?
                </motion.h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join the revolution connecting <span className="text-purple-400 font-bold">millions of fans</span> with 
                  <span className="text-pink-400 font-bold"> thousands of celebrities</span> worldwide
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                  <Link href="/auth/fan/signup">
                    <motion.button 
                      className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-black text-lg rounded-xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden min-w-[250px]"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        <HeartIcon className="w-6 h-6 group-hover:animate-pulse" />
                        <span>JOIN AS FAN</span>
                        <SparklesIcon className="w-5 h-5 group-hover:animate-spin" />
                      </div>
                    </motion.button>
                  </Link>

                  <Link href="/celebrity/signup">
                    <motion.button 
                      className="group relative px-12 py-4 bg-transparent border-2 border-white/60 text-white font-black text-lg rounded-xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 min-w-[250px] hover:border-white/80"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        <StarIcon className="w-6 h-6 group-hover:animate-spin text-yellow-400" />
                        <span>BECOME STAR</span>
                        <TrophyIcon className="w-5 h-5 group-hover:animate-bounce text-yellow-400" />
                      </div>
                    </motion.button>
                  </Link>
                </div>

                <motion.p 
                  className="text-gray-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Free to join • Instant access • No credit card required ✨
                </motion.p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Mouse Follower Effect */}
      {typeof window !== 'undefined' && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-difference pointer-events-none z-50"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}