'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  StarIcon, 
  HeartIcon, 
  UserIcon,
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

// Define the celebrity type
interface Celebrity {
  id: string;
  name: string;
  stageName: string;
  category: string;
  followers: number;
  rating: number;
  price: string;
  image: string;
  verified: boolean;
  bio: string;
  services: Service[];
  socialMedia: SocialMedia;
}

interface Service {
  name: string;
  price: string;
  description: string;
}

interface SocialMedia {
  instagram: string;
  twitter: string;
  youtube: string;
}

export default function CelebrityProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real API call
    const mockCelebrity: Celebrity = {
      id: params.id as string,
      name: 'John Doe',
      stageName: 'JD Music',
      category: 'music',
      followers: 125000,
      rating: 4.8,
      price: '$50',
      image: '🎵',
      verified: true,
      bio: 'Grammy-winning artist and producer with over 10 years of experience in the music industry. Known for hit songs and collaborations with top artists.',
      services: [
        { name: 'Personal Message', price: '$25', description: 'Get a personalized video message' },
        { name: 'Live Chat', price: '$50', description: '30-minute live chat session' },
        { name: 'Video Call', price: '$100', description: '15-minute video call' }
      ],
      socialMedia: {
        instagram: '@jdmusic',
        twitter: '@jdmusic',
        youtube: 'JD Music Official'
      }
    };

    // Simulate API call
    setTimeout(() => {
      setCelebrity(mockCelebrity);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading celebrity profile...</p>
        </div>
      </div>
    );
  }

  if (!celebrity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold mb-2">Celebrity Not Found</h1>
          <p className="text-gray-300 mb-4">The celebrity you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/celebrities')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Celebrities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/celebrities')}
          className="flex items-center text-white hover:text-purple-300 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Celebrities
        </button>

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl">
              {celebrity.image}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold text-white">{celebrity.stageName}</h1>
                {celebrity.verified && (
                  <StarIcon className="h-6 w-6 text-blue-400 ml-2" />
                )}
              </div>
              
              <p className="text-gray-300 mb-4">{celebrity.bio}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-white">{celebrity.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-white">{celebrity.rating} rating</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
                  <HeartIcon className="h-5 w-5 inline mr-2" />
                  Follow
                </button>
                <button className="bg-white/10 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5 inline mr-2" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {celebrity.services.map((service: Service, index: number) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">{service.price}</span>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(celebrity.socialMedia).map(([platform, handle]) => (
              <div key={platform} className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-white font-medium capitalize">{platform}:</span>
                  <span className="text-purple-400 ml-2">{handle}</span>
                </div>
                <button className="text-white hover:text-purple-300">
                  <ArrowLeftIcon className="h-4 w-4 rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}