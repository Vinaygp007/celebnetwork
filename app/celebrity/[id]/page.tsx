'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  StarIcon, 
  UserGroupIcon, 
  MapPinIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  HeartIcon,
  ShareIcon,
  PlayIcon,
  MusicalNoteIcon,
  TrophyIcon,
  FireIcon,
  SparklesIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';
import { 
  HeartIcon as HeartOutlineIcon 
} from '@heroicons/react/24/outline';

// Celebrity interface for type safety
interface Celebrity {
  id: number;
  name: string;
  category: string;
  country: string;
  fanbase: string;
  image: string;
  coverImage: string;
  verified: boolean;
  recentActivity: string;
  genre: string;
  popularityScore: number;
  monthlyListeners: string;
  bio: string;
  socialMedia: {
    instagram: string;
    youtube: string;
    spotify: string;
    twitter: string;
  };
  achievements: string[];
  topSongs: Array<{
    title: string;
    plays: string;
    duration: string;
  }>;
  recentNews: Array<{
    title: string;
    date: string;
    source: string;
  }>;
  upcomingEvents: Array<{
    title: string;
    date: string;
    venue: string;
    ticketsLeft: string;
  }>;
}

// Mock celebrity data
const celebrities: Celebrity[] = [
  {
    id: 1,
    name: "Coldplay",
    category: "International Singer",
    country: "United Kingdom",
    fanbase: "45M",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=400&fit=crop",
    verified: true,
    recentActivity: "Live at Wembley Stadium",
    genre: "Rock/Pop",
    popularityScore: 98,
    monthlyListeners: "89.2M",
    bio: "Coldplay are a British rock band formed in London in 1996. They consist of vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman, drummer Will Champion and creative director Phil Harvey. They met at University College London and began playing music together from 1996 to 1998, first calling themselves Pectoralz and then Starfish.",
    socialMedia: {
      instagram: "40M",
      youtube: "15M",
      spotify: "50M",
      twitter: "25M"
    },
    achievements: [
      "9 BRIT Awards",
      "7 Grammy Awards", 
      "6 Ivor Novello Awards",
      "Over 100 million records sold worldwide"
    ],
    topSongs: [
      { title: "Yellow", plays: "1.2B", duration: "4:29" },
      { title: "Viva La Vida", plays: "2.1B", duration: "4:01" },
      { title: "The Scientist", plays: "890M", duration: "5:09" },
      { title: "Fix You", plays: "1.5B", duration: "4:54" }
    ],
    recentNews: [
      {
        title: "Coldplay announces new album 'Music of the Spheres'",
        date: "2024-06-15",
        source: "Rolling Stone"
      },
      {
        title: "Record-breaking Wembley Stadium performance",
        date: "2024-06-10", 
        source: "BBC Music"
      },
      {
        title: "Sustainable touring initiatives announced",
        date: "2024-06-05",
        source: "Guardian"
      }
    ],
    upcomingEvents: [
      {
        title: "Music of the Spheres World Tour - London",
        date: "2024-08-15",
        venue: "Wembley Stadium",
        ticketsLeft: "Limited"
      },
      {
        title: "Music of the Spheres World Tour - Paris", 
        date: "2024-08-20",
        venue: "Stade de France",
        ticketsLeft: "Available"
      }
    ]
  },
  {
    id: 2,
    name: "Ariana Grande",
    category: "Pop Superstar",
    country: "United States",
    fanbase: "78M",
    image: "https://images.unsplash.com/photo-1494790108755-2616c2a1e44e?w=800&h=800&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=400&fit=crop",
    verified: true,
    recentActivity: "Sweetener World Tour",
    genre: "Pop/R&B",
    popularityScore: 95,
    monthlyListeners: "67.8M",
    bio: "Ariana Grande is an American singer, songwriter and actress. She has received various accolades, including two Grammy Awards, one Brit Award, two Billboard Music Awards, three American Music Awards, nine MTV Video Music Awards, and 30 Guinness World Records.",
    socialMedia: {
      instagram: "350M",
      youtube: "52M",
      spotify: "85M",
      twitter: "85M"
    },
    achievements: [
      "2 Grammy Awards",
      "Billboard Woman of the Year 2018",
      "Teen Choice Awards Icon Award",
      "Over 85 million records sold worldwide"
    ],
    topSongs: [
      { title: "Thank U, Next", plays: "2.8B", duration: "3:27" },
      { title: "7 rings", plays: "2.5B", duration: "2:58" },
      { title: "Problem", plays: "1.9B", duration: "3:13" },
      { title: "Side to Side", plays: "1.6B", duration: "3:46" }
    ],
    recentNews: [
      {
        title: "Ariana Grande to star in Wicked movie adaptation",
        date: "2024-06-20",
        source: "Variety"
      },
      {
        title: "New single breaks streaming records",
        date: "2024-06-15",
        source: "Billboard"
      }
    ],
    upcomingEvents: [
      {
        title: "The Sweetener Sessions - Los Angeles",
        date: "2024-09-10",
        venue: "Hollywood Bowl",
        ticketsLeft: "Sold Out"
      }
    ]
  }
];

export default function CelebrityProfile() {
  const params = useParams();
  const celebrityId = parseInt(params.id as string);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const celebrity = celebrities.find(c => c.id === celebrityId);

  if (!celebrity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <StarIcon className="w-10 h-10 text-white animate-spin" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Celebrity Not Found</h1>
          <Link href="/celebrities" className="text-purple-300 hover:text-white transition-colors">
            ← Back to Celebrities
          </Link>
        </div>
      </div>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${celebrity.name} - CelebNetwork`,
        text: `Check out ${celebrity.name} on CelebNetwork`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: EyeIcon },
    { id: 'music', name: 'Music', icon: MusicalNoteIcon },
    { id: 'achievements', name: 'Awards', icon: TrophyIcon },
    { id: 'news', name: 'News', icon: FireIcon }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-indigo-900/50"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 scale-110 transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
        >
          <Image
            src={celebrity.coverImage}
            alt={`${celebrity.name} cover`}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30"></div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex justify-between items-center">
            <Link
              href="/celebrities"
              className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span>Back</span>
            </Link>
            
            <div className="flex gap-3">
              <button 
                onClick={handleShare}
                className="bg-white/10 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={handleFollow}
                className="bg-white/10 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110"
              >
                {isFollowing ? (
                  <HeartIcon className="h-5 w-5 text-red-400 animate-pulse" />
                ) : (
                  <HeartOutlineIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* Profile Image with Glow Effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 scale-110"></div>
                <div className="relative">
                  <Image
                    src={celebrity.image}
                    alt={celebrity.name}
                    width={180}
                    height={180}
                    className="rounded-full object-cover border-4 border-white/30 backdrop-blur-sm shadow-2xl"
                  />
                  {celebrity.verified && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full animate-bounce">
                      <StarIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="bg-white/90 p-4 rounded-full hover:scale-110 transition-transform">
                      {isPlaying ? (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-6 bg-purple-600 animate-pulse"></div>
                            <div className="w-1 h-6 bg-purple-600 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-6 bg-purple-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      ) : (
                        <PlayIcon className="h-6 w-6 text-purple-600 ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Celebrity Info */}
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {celebrity.name}
                  </h1>
                  <div className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FireIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">HOT</span>
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl text-purple-200 font-medium mb-4">
                  {celebrity.category}
                </p>
                
                <div className="flex flex-wrap gap-6 text-white/80 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-purple-400" />
                    <span>{celebrity.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="h-5 w-5 text-blue-400" />
                    <span>{celebrity.fanbase} followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MusicalNoteIcon className="h-5 w-5 text-green-400" />
                    <span>{celebrity.monthlyListeners} monthly listeners</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Popularity', value: `${celebrity.popularityScore}%`, icon: ChartBarIcon, color: 'text-green-400' },
                    { label: 'Genre', value: celebrity.genre, icon: MusicalNoteIcon, color: 'text-purple-400' },
                    { label: 'Active', value: 'Live', icon: FireIcon, color: 'text-red-400' },
                    { label: 'Rating', value: '4.9★', icon: StarIcon, color: 'text-yellow-400' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <span className="text-white/60 text-sm">{stat.label}</span>
                      </div>
                      <div className={`font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleFollow}
                    className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isFollowing 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    }`}
                  >
                    {isFollowing ? (
                      <HeartIcon className="h-5 w-5 animate-pulse" />
                    ) : (
                      <HeartOutlineIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    )}
                    {isFollowing ? 'Following' : 'Follow'}
                    <SparklesIcon className="h-4 w-4 animate-pulse" />
                  </button>
                  
                  <button className="flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:scale-105">
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
        {/* Tab Navigation */}
        <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-purple-400" />
                    Biography
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg">{celebrity.bio}</p>
                </div>

                {/* Social Media Stats */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Social Presence</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(celebrity.socialMedia).map(([platform, followers], index) => (
                      <div 
                        key={platform}
                        className="group bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-6 rounded-xl hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {platform === 'instagram' && '📷'}
                            {platform === 'youtube' && '📺'}
                            {platform === 'spotify' && '🎵'}
                            {platform === 'twitter' && '🐦'}
                          </div>
                          <div className="font-bold text-white text-xl mb-1">{followers}</div>
                          <div className="text-white/60 capitalize text-sm">{platform}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-green-400" />
                    Upcoming Shows
                  </h3>
                  <div className="space-y-4">
                    {celebrity.upcomingEvents.map((event, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <h4 className="font-semibold text-white mb-2">{event.title}</h4>
                        <div className="text-white/60 text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-3 w-3" />
                            {event.venue}
                          </div>
                          <div className={`inline-flex px-2 py-1 rounded-full text-xs ${
                            event.ticketsLeft === 'Limited' 
                              ? 'bg-red-500/20 text-red-400' 
                              : event.ticketsLeft === 'Sold Out'
                              ? 'bg-gray-500/20 text-gray-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {event.ticketsLeft} tickets
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fan Engagement */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Fan Stats</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        {celebrity.fanbase}
                      </div>
                      <div className="text-white/60">Total Fans</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-xl font-bold text-green-400">Live</div>
                        <div className="text-white/60 text-sm">Status</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-xl font-bold text-yellow-400">4.9★</div>
                        <div className="text-white/60 text-sm">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Music Tab */}
          {activeTab === 'music' && (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MusicalNoteIcon className="h-6 w-6 text-green-400" />
                  Top Tracks
                </h2>
                <div className="space-y-4">
                  {celebrity.topSongs.map((song, index) => (
                    <div 
                      key={index}
                      className="group flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{song.title}</h3>
                        <div className="text-white/60 text-sm">{song.plays} plays • {song.duration}</div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/10 rounded-full hover:bg-white/20">
                        <PlayIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrophyIcon className="h-6 w-6 text-yellow-400" />
                  Awards & Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {celebrity.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl hover:from-yellow-600/30 hover:to-orange-600/30 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0">
                        <TrophyIcon className="h-8 w-8 text-yellow-400" />
                      </div>
                      <span className="text-white font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FireIcon className="h-6 w-6 text-red-400" />
                  Latest News
                </h2>
                <div className="space-y-6">
                  {celebrity.recentNews.map((news, index) => (
                    <div 
                      key={index}
                      className="group p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer border-l-4 border-purple-500"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                        {news.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(news.date).toLocaleDateString()}
                        </div>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}