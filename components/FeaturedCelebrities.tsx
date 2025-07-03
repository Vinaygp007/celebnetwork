'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Users, PlayCircle } from 'lucide-react';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  image: string;
  followers: string;
  verified: boolean;
  genre?: string;
}

const featuredCelebrities: Celebrity[] = [
  {
    id: 1,
    name: "Coldplay",
    category: "International Singer",
    image: "/api/placeholder/300/400",
    followers: "45M",
    verified: true,
    genre: "Alternative Rock"
  },
  {
    id: 2,
    name: "Dua Lipa",
    category: "Pop Star",
    image: "/api/placeholder/300/400",
    followers: "32M",
    verified: true,
    genre: "Pop"
  },
  {
    id: 3,
    name: "The Weeknd",
    category: "R&B Artist",
    image: "/api/placeholder/300/400",
    followers: "28M",
    verified: true,
    genre: "R&B"
  },
  {
    id: 4,
    name: "Taylor Swift",
    category: "Pop Icon",
    image: "/api/placeholder/300/400",
    followers: "89M",
    verified: true,
    genre: "Pop"
  },
  {
    id: 5,
    name: "Ed Sheeran",
    category: "Singer-Songwriter",
    image: "/api/placeholder/300/400",
    followers: "42M",
    verified: true,
    genre: "Pop"
  },
  {
    id: 6,
    name: "Ariana Grande",
    category: "Pop Sensation",
    image: "/api/placeholder/300/400",
    followers: "51M",
    verified: true,
    genre: "Pop"
  }
];

export function FeaturedCelebrities() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Celebrities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and connect with the world's most popular stars
          </p>
        </div>

        {/* Celebrity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCelebrities.map((celebrity) => (
            <div
              key={celebrity.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredId(celebrity.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Celebrity Image */}
              <div className="relative h-80 bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Verified Badge */}
                {celebrity.verified && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === celebrity.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-colors">
                    <PlayCircle className="w-8 h-8" />
                  </button>
                </div>

                {/* Celebrity Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{celebrity.name}</h3>
                  <p className="text-purple-200 font-medium">{celebrity.category}</p>
                  {celebrity.genre && (
                    <p className="text-white/80 text-sm mt-1">{celebrity.genre}</p>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 font-medium">{celebrity.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-600 text-sm">4.9</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/celebrity/${celebrity.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    View Profile
                  </Link>
                  <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/celebrities"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            View All Celebrities
            <Star className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}