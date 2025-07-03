'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  StarIcon, 
  HeartIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

// 1. Define the type for a celebrity
type Celebrity = {
  id: number;
  name: string;
  stageName: string;
  category: string;
  followers: number;
  rating: number;
  price: string;
  image: string;
  verified: boolean;
  bio: string;
};

export default function CelebritiesPage() {
  // 2. Use the type in your state
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all', 'music', 'film', 'tv', 'sports', 'comedy', 'social media', 'gaming'
  ];

  // Mock data - replace with real API call
  const mockCelebrities: Celebrity[] = [
    {
      id: 1,
      name: 'John Doe',
      stageName: 'JD Music',
      category: 'music',
      followers: 125000,
      rating: 4.8,
      price: '$50',
      image: '🎵',
      verified: true,
      bio: 'Grammy-winning artist and producer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      stageName: 'Jane S',
      category: 'film',
      followers: 89000,
      rating: 4.9,
      price: '$75',
      image: '🎬',
      verified: true,
      bio: 'Award-winning actress'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      stageName: 'Comedy Mike',
      category: 'comedy',
      followers: 65000,
      rating: 4.7,
      price: '$35',
      image: '😂',
      verified: false,
      bio: 'Stand-up comedian and content creator'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCelebrities(mockCelebrities);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCelebrities = celebrities.filter(celeb => {
    const matchesSearch = celeb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         celeb.stageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || celeb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading celebrities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Celebrities</span>
          </h1>
          <p className="text-xl text-gray-300">
            Connect with your favorite stars and discover new talent
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search celebrities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white capitalize"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Celebrities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCelebrities.map(celebrity => (
            <Link key={celebrity.id} href={`/celebrities/${celebrity.id}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {celebrity.image}
                  </div>
                  
                  <div className="flex items-center justify-center mb-2">
                    <h3 className="text-lg font-bold text-white">{celebrity.stageName}</h3>
                    {celebrity.verified && (
                      <div className="ml-2 text-blue-400">
                        <StarIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{celebrity.bio}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-300">{celebrity.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{celebrity.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-400">{celebrity.price}</span>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-700 hover:to-pink-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCelebrities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-bold text-white mb-2">No celebrities found</h3>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}