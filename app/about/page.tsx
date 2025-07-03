'use client';

import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { 
  Star, 
  Users, 
  Heart, 
  Sparkles, 
  Shield, 
  Globe, 
  Award, 
  TrendingUp,
  MessageCircle,
  Video,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Active Celebrities', value: '10,000+', icon: Star },
    { label: 'Happy Fans', value: '500,000+', icon: Users },
    { label: 'Messages Sent', value: '2M+', icon: MessageCircle },
    { label: 'Countries', value: '50+', icon: Globe },
  ];

  const features = [
    {
      icon: Video,
      title: 'Personal Video Messages',
      description: 'Get customized video messages from your favorite celebrities for special occasions.'
    },
    {
      icon: MessageCircle,
      title: 'Direct Messaging',
      description: 'Chat directly with celebrities through our secure messaging platform.'
    },
    {
      icon: Shield,
      title: 'Verified Celebrities',
      description: 'All celebrities go through our strict verification process for authenticity.'
    },
    {
      icon: Zap,
      title: 'Instant Connections',
      description: 'Connect with celebrities instantly and get responses faster than ever.'
    },
    {
      icon: Award,
      title: 'Exclusive Content',
      description: 'Access behind-the-scenes content and exclusive updates from your favorite stars.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with celebrities from around the world in multiple languages.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      description: 'Former entertainment industry executive with 15+ years of experience.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Tech veteran who previously built platforms for major social media companies.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Celebrity Relations',
      image: '👩‍🎤',
      description: 'Celebrity manager with connections to top stars across all entertainment sectors.'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      image: '👨‍🎨',
      description: 'Product designer focused on creating seamless user experiences.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Authentic Connections',
      description: 'We believe in creating genuine relationships between fans and celebrities.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your privacy and security are our top priorities in every interaction.'
    },
    {
      icon: Sparkles,
      title: 'Magic Moments',
      description: 'We create unforgettable experiences that bring joy to fans worldwide.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously evolving to provide the best celebrity-fan experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            About CelebNetwork
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridging the Gap Between{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stars & Fans
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            We're revolutionizing how fans connect with their favorite celebrities through 
            personalized interactions, exclusive content, and unforgettable experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-2">
                  <stat.icon className="w-6 h-6 text-purple-400 mr-2" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow-lg p-2 flex space-x-2">
              {[
                { id: 'story', label: 'Our Story', icon: Heart },
                { id: 'features', label: 'Features', icon: Star },
                { id: 'team', label: 'Team', icon: Users },
                { id: 'values', label: 'Values', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Our Story Tab */}
          {activeTab === 'story' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  How CelebNetwork Was Born
                </h2>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    It all started with a simple idea: what if fans could have meaningful, 
                    personal interactions with their favorite celebrities? In 2023, our founders 
                    realized that despite social media's popularity, there was still a huge gap 
                    between celebrities and their fans.
                  </p>
                  
                  <p>
                    Traditional social media platforms were one-way streets. Fans could follow, 
                    like, and comment, but rarely got personal responses. Meanwhile, celebrities 
                    wanted to connect with their fans in more meaningful ways but lacked the 
                    right platform to do so safely and efficiently.
                  </p>
                  
                  <p>
                    That's when CelebNetwork was born. We created a platform where verified 
                    celebrities could offer personalized video messages, direct chats, and 
                    exclusive content to their fans. Our mission was simple: make celebrity-fan 
                    interactions authentic, accessible, and unforgettable.
                  </p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <h3 className="font-semibold text-purple-900 mb-2">Our Mission</h3>
                    <p className="text-purple-800">
                      "To create a world where every fan can have a personal moment with their 
                      favorite celebrity, fostering genuine connections that inspire and bring joy."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                <p className="text-xl text-gray-600">
                  The passionate people behind CelebNetwork
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                      {member.image}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-xl text-gray-600">
                  The principles that guide everything we do
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose CelebNetwork */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CelebNetwork?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another social platform. We're a community built on trust, 
              authenticity, and meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Verified</h3>
              <p className="text-gray-600">
                Every celebrity on our platform goes through a rigorous verification process 
                to ensure authenticity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your personal information and conversations are protected with enterprise-grade 
                security measures.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Delivery</h3>
              <p className="text-gray-600">
                Get your personalized messages and content delivered instantly, 
                no waiting around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect with Your Favorite Stars?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of fans who have already discovered the magic of personal 
            celebrity connections on CelebNetwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              Browse Celebrities
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Join as a Celebrity
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}