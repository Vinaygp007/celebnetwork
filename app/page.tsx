'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { 
  StarIcon, 
  PlayIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  SparklesIcon, 
  HeartIcon,
  FireIcon,
  TrophyIcon,
  EyeIcon,
  MicrophoneIcon,
  FilmIcon,
  BoltIcon
} from '@heroicons/react/24/solid';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
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

  useEffect(() => {
    setIsVisible(true);
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, [mouseX, mouseY]);

  const featuredCelebrities = [
    {
      id: 1,
      name: "Luna Chen",
      category: "K-Pop Sensation",
      fans: "12.3M",
      image: "🎤",
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      stats: { concerts: 187, awards: 24, countries: 28 },
      description: "Global K-Pop icon breaking boundaries"
    },
    {
      id: 2,
      name: "Marcus Sterling",
      category: "Hollywood Legend",
      fans: "25.7M",
      image: "🎬",
      gradient: "from-blue-500 via-cyan-500 to-teal-600",
      stats: { movies: 67, awards: 18, countries: 35 },
      description: "Academy Award winning actor"
    },
    {
      id: 3,
      name: "Aria Blackwood",
      category: "Visionary Speaker",
      fans: "8.9M",
      image: "💫",
      gradient: "from-amber-500 via-orange-500 to-red-600",
      stats: { talks: 456, awards: 31, countries: 42 },
      description: "Transforming minds worldwide"
    },
    {
      id: 4,
      name: "Ravi Sharma",
      category: "Bollywood Superstar",
      fans: "34.2M",
      image: "🌟",
      gradient: "from-green-500 via-emerald-500 to-cyan-600",
      stats: { films: 89, awards: 45, countries: 23 },
      description: "India's biggest entertainment icon"
    }
  ];

  const stats = [
    { label: "Global Celebrities", value: "50K+", icon: "⭐", color: "from-yellow-400 to-orange-500" },
    { label: "Active Fans", value: "100M+", icon: "❤️", color: "from-red-400 to-pink-500" },
    { label: "Countries", value: "195", icon: "🌍", color: "from-green-400 to-blue-500" },
    { label: "Live Events", value: "25K+", icon: "🎉", color: "from-purple-400 to-indigo-500" }
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
      text: "Found amazing talent through this platform. It's like having a crystal ball for entertainment!",
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
      icon: <BoltIcon className="w-8 h-8" />,
      title: "AI-Powered Discovery",
      description: "Revolutionary AI that understands natural language to find perfect celebrity matches",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with stars from every continent, culture, and entertainment genre",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <TrophyIcon className="w-8 h-8" />,
      title: "Premium Analytics",
      description: "Real-time insights, engagement metrics, and fan behavior analytics",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Smart Matching",
      description: "Intelligent algorithms that connect fans with their perfect celebrity matches",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: <PlayIcon className="w-8 h-8" />,
      title: "Live Experiences",
      description: "Exclusive live events, virtual meet-and-greets, and interactive experiences",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: <FireIcon className="w-8 h-8" />,
      title: "Trending Content",
      description: "Real-time updates on celebrity news, achievements, and exclusive content",
      color: "from-red-400 to-pink-500"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Ultra-Advanced Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0"
      >
        {/* Primary Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black" />
        
        {/* Aurora Borealis Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20 animate-pulse" />
        </div>

        {/* Dynamic Floating Orbs */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full mix-blend-screen filter blur-xl"
            style={{
              background: `radial-gradient(circle, ${
                ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8'][i % 9]
              }40, transparent)`,
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
            }}
            animate={{
              x: [0, Math.random() * 800 - 400],
              y: [0, Math.random() * 800 - 400],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 10,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
          />
        ))}

        {/* Constellation Effect */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-2 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
            animate={{
              x: [-100, (typeof window !== 'undefined' ? window.innerWidth : 1200) + 100],
              y: [Math.random() * 300, Math.random() * 300 + 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 10 + 5,
              repeatDelay: Math.random() * 15 + 10,
            }}
            style={{
              top: `${Math.random() * 50}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Ultra Premium */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            style={{ y: textY, scale: headerScale, opacity: headerOpacity }}
            className="max-w-8xl mx-auto text-center"
          >
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Pre-title */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-8"
                  >
                    <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl text-purple-300 font-medium text-lg">
                      <SparklesIcon className="w-5 h-5 mr-2 animate-spin" />
                      Welcome to the Future of Entertainment
                    </span>
                  </motion.div>

                  {/* Main Headline - Absolutely Massive */}
                  <motion.h1 
                    className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-12 leading-none"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  >
                    <motion.span 
                      className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 8,
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
                        textShadow: '0 0 100px rgba(168, 85, 247, 0.5)'
                      }}
                    >
                      NETWORK
                    </motion.span>
                  </motion.h1>

                  {/* Epic Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1 }}
                    className="mb-16"
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl text-gray-300 mb-8 max-w-6xl mx-auto leading-relaxed font-light">
                      Where <span className="text-purple-400 font-bold">Global Superstars</span> meet{' '}
                      <span className="text-pink-400 font-bold">Devoted Fans</span> in the{' '}
                      <span className="text-cyan-400 font-bold">Ultimate Entertainment Universe</span>
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-lg text-gray-400">
                      <div className="flex items-center space-x-2">
                        <BoltIcon className="w-6 h-6 text-yellow-400" />
                        <span>AI-Powered Discovery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GlobeAltIcon className="w-6 h-6 text-blue-400" />
                        <span>Global Network</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HeartIcon className="w-6 h-6 text-red-400" />
                        <span>Real Connections</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Revolutionary Search Box */}
                  <motion.div 
                    className="max-w-5xl mx-auto mb-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 1.3 }}
                  >
                    <div className="relative group">
                      {/* Multiple Glow Layers */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                      
                      <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-3 border border-white/30 shadow-2xl">
                        <div className="flex items-center">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="✨ Try: 'Korean pop star who speaks English' or 'Funny action movie actor'..."
                              className="w-full px-8 py-6 bg-transparent text-white placeholder-gray-300 text-xl focus:outline-none font-medium"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          <motion.button 
                            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-3 relative overflow-hidden group/btn"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                            <SparklesIcon className="w-6 h-6 relative z-10 group-hover/btn:animate-spin" />
                            <span className="relative z-10">Discover Magic</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Epic Action Buttons */}
                  <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                  >
                    <Link href="/celebrities">
                      <motion.button 
                        className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden min-w-[350px]"
                        whileHover={{ scale: 1.08, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center space-x-4">
                          <UserGroupIcon className="w-8 h-8 group-hover:animate-pulse" />
                          <span>Explore Universe</span>
                          <SparklesIcon className="w-6 h-6 group-hover:animate-spin" />
                        </div>
                      </motion.button>
                    </Link>

                    <Link href="/celebrity/signup">
                      <motion.button 
                        className="group relative px-12 py-6 bg-transparent border-3 border-white/40 text-white font-bold text-2xl rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-500 min-w-[350px] border-white/40 hover:border-white/80"
                        whileHover={{ scale: 1.08, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="relative flex items-center justify-center space-x-4">
                          <StarIcon className="w-8 h-8 group-hover:animate-spin text-yellow-400" />
                          <span>Become a Star</span>
                          <TrophyIcon className="w-6 h-6 group-hover:animate-bounce text-yellow-400" />
                        </div>
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Mind-Blowing Stats */}
                  <motion.div 
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.7 }}
                  >
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        className="group text-center relative"
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.7 + index * 0.2 }}
                        whileHover={{ scale: 1.15, y: -10 }}
                      >
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                          <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                            <div className="text-6xl mb-4">{stat.icon}</div>
                            <motion.div 
                              className="text-4xl lg:text-5xl font-black text-white mb-2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-gray-300 font-medium text-lg">{stat.label}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating CTA */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white/60 text-center">
              <div className="text-sm mb-2">Scroll to explore the magic</div>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto relative">
                <motion.div
                  className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Celebrities Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-6xl md:text-8xl font-black text-white mb-8"
                style={{ textShadow: '0 0 100px rgba(168, 85, 247, 0.3)' }}
              >
                FEATURED <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">SUPERSTARS</span>
              </motion.h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Meet the global icons who are redefining entertainment and inspiring millions worldwide
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredCelebrities.map((celebrity, index) => (
                <motion.div 
                  key={celebrity.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -20 }}
                >
                  {/* Multiple Glow Layers */}
                  <div className={`absolute -inset-3 bg-gradient-to-r ${celebrity.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-300`}></div>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${celebrity.gradient} rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300`}></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 h-full group-hover:border-white/60 transition-all duration-500">
                    {/* Celebrity Avatar */}
                    <div className="text-center mb-8">
                      <motion.div 
                        className={`w-32 h-32 bg-gradient-to-r ${celebrity.gradient} rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-2xl relative`}
                        whileHover={{ scale: 1.2, rotateZ: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${celebrity.gradient} rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`}></div>
                        <span className="relative z-10">{celebrity.image}</span>
                      </motion.div>
                      <h3 className="text-3xl font-black text-white mb-2">{celebrity.name}</h3>
                      <p className="text-purple-300 font-bold text-lg">{celebrity.category}</p>
                      <p className="text-gray-400 text-sm mt-2 italic">{celebrity.description}</p>
                      <div className="flex items-center justify-center space-x-2 mt-4">
                        <HeartIcon className="w-5 h-5 text-red-400 animate-pulse" />
                        <span className="text-white font-bold text-xl">{celebrity.fans}</span>
                        <span className="text-gray-400">devoted fans</span>
                      </div>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <motion.div 
                          className="text-3xl font-black text-white mb-1"
                          whileHover={{ scale: 1.2 }}
                        >
                          {celebrity.stats.concerts || celebrity.stats.movies || celebrity.stats.talks || celebrity.stats.films}
                        </motion.div>
                        <div className="text-xs text-gray-400 font-medium">Projects</div>
                      </div>
                      <div className="text-center">
                        <motion.div 
                          className="text-3xl font-black text-white mb-1"
                          whileHover={{ scale: 1.2 }}
                        >
                          {celebrity.stats.awards}
                        </motion.div>
                        <div className="text-xs text-gray-400 font-medium">Awards</div>
                      </div>
                      <div className="text-center">
                        <motion.div 
                          className="text-3xl font-black text-white mb-1"
                          whileHover={{ scale: 1.2 }}
                        >
                          {celebrity.stats.countries}
                        </motion.div>
                        <div className="text-xs text-gray-400 font-medium">Countries</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button 
                      className={`w-full bg-gradient-to-r ${celebrity.gradient} text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group/btn`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 text-lg">View Universe</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black text-white mb-8">
                WHY <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">CHOOSE US</span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Experience the most advanced celebrity discovery platform ever created
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
                  
                  <div className="relative bg-black/50 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-500">
                    <motion.div 
                      className={`w-24 h-24 bg-gradient-to-r ${feature.color} rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl relative`}
                      whileHover={{ scale: 1.2, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-lg opacity-50`}></div>
                      <div className="relative z-10 text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-white mb-6 text-center">{feature.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2 
              className="text-6xl md:text-8xl font-black text-white mb-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              SUCCESS <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">STORIES</span>
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                
                <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-16 border border-white/30">
                  <div className="text-8xl mb-8">{testimonials[currentTestimonial].image}</div>
                  
                  <div className="flex justify-center mb-8">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <StarIcon className="w-10 h-10 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <blockquote className="text-3xl md:text-4xl text-white font-light italic mb-10 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="text-purple-300 font-bold text-2xl mb-2">
                    — {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400 text-xl">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Indicators */}
            <div className="flex justify-center space-x-4 mt-12">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-150 shadow-lg shadow-purple-400/50' 
                      : 'bg-white/30 hover:bg-white/50 hover:scale-125'
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Epic Background Effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-60"></div>
              
              <div className="relative bg-black/70 backdrop-blur-2xl rounded-3xl p-20 border border-white/40">
                <motion.h2 
                  className="text-6xl md:text-8xl font-black text-white mb-12"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  READY TO <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">SHINE</span>?
                </motion.h2>
                
                <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
                  Join the revolution that's connecting <span className="text-purple-400 font-bold">millions of fans</span> with 
                  <span className="text-pink-400 font-bold"> thousands of celebrities</span> worldwide
                </p>
                
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
                  <Link href="/auth/fan/signup">
                    <motion.button 
                      className="group relative px-16 py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-black text-2xl rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden min-w-[300px]"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center space-x-4">
                        <HeartIcon className="w-8 h-8 group-hover:animate-pulse" />
                        <span>JOIN AS FAN</span>
                        <SparklesIcon className="w-6 h-6 group-hover:animate-spin" />
                      </div>
                    </motion.button>
                  </Link>

                  <Link href="/celebrity/signup">
                    <motion.button 
                      className="group relative px-16 py-8 bg-transparent border-4 border-white/60 text-white font-black text-2xl rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-500 min-w-[300px] hover:border-white/100"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <div className="relative flex items-center justify-center space-x-4">
                        <StarIcon className="w-8 h-8 group-hover:animate-spin text-yellow-400" />
                        <span>BECOME STAR</span>
                        <TrophyIcon className="w-6 h-6 group-hover:animate-bounce text-yellow-400" />
                      </div>
                    </motion.button>
                  </Link>
                </div>

                <motion.p 
                  className="text-gray-400 text-lg"
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
          className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-difference pointer-events-none z-50"
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