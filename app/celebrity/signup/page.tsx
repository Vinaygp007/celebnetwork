'use client';

import { useState } from 'react';
import { 
  SparklesIcon, 
  UserIcon, 
  MapPinIcon, 
  LinkIcon,
  StarIcon 
} from '@heroicons/react/24/solid';

interface CelebrityFormData {
  name: string;
  category: string;
  country: string;
  genre: string;
  bio: string;
  instagram: string;
  youtube: string;
  spotify: string;
  twitter: string;
  fanbase: string;
  achievements: string[];
  oneLineIntro: string;
}

const categories = [
  'Singer',
  'Actor', 
  'Motivational Speaker',
  'Music Composer',
  'Director',
  'Writer',
  'Comedian',
  'Dancer',
  'Other'
];

const countries = [
  'United States',
  'India', 
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'South Korea',
  'Brazil',
  'Other'
];

export default function CelebritySignup() {
  const [step, setStep] = useState(1);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [formData, setFormData] = useState<CelebrityFormData>({
    name: '',
    category: '',
    country: '',
    genre: '',
    bio: '',
    instagram: '',
    youtube: '',
    spotify: '',
    twitter: '',
    fanbase: '',
    achievements: [],
    oneLineIntro: ''
  });

  const handleInputChange = (field: keyof CelebrityFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAIAutofill = async () => {
    if (!formData.oneLineIntro.trim()) {
      alert('Please enter a one-line introduction first');
      return;
    }

    setIsAIProcessing(true);
    
    try {
      // In a real implementation, this would call the backend AI service
      // For now, we'll use basic parsing of the introduction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const intro = formData.oneLineIntro.toLowerCase();
      
      // Basic keyword-based suggestions
      const suggestedData: Partial<CelebrityFormData> = {};
      
      if (intro.includes('singer') || intro.includes('musician')) {
        suggestedData.category = 'Singer';
        suggestedData.genre = 'Pop'; // Default genre
      } else if (intro.includes('actor') || intro.includes('actress')) {
        suggestedData.category = 'Actor';
      } else if (intro.includes('director')) {
        suggestedData.category = 'Director';
      } else if (intro.includes('comedian')) {
        suggestedData.category = 'Comedian';
      } else if (intro.includes('speaker')) {
        suggestedData.category = 'Motivational Speaker';
      }

      // Apply suggestions to form
      setFormData(prev => ({
        ...prev,
        ...suggestedData
      }));

      alert('Profile suggestions applied! You can modify them as needed.');
    } catch {
      alert('Failed to analyze introduction. Please fill the form manually.');
    } finally {
      setIsAIProcessing(false);
    }
    
    setStep(2);
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['name', 'category', 'country', 'fanbase'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof CelebrityFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate fanbase is a number
    if (isNaN(Number(formData.fanbase)) || Number(formData.fanbase) < 1000) {
      alert('Fanbase must be a number and at least 1000');
      return;
    }

    // Validate social media URLs
    const urlFields = ['instagram', 'youtube', 'spotify', 'twitter'];
    for (const field of urlFields) {
      const value = formData[field as keyof CelebrityFormData] as string;
      if (value && typeof value === 'string' && !value.startsWith('@') && !value.startsWith('http')) {
        alert(`${field} should start with @ or be a valid URL`);
        return;
      }
    }

    // Submit profile to backend API
    try {
      const response = await fetch('/api/celebrity/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Celebrity profile created successfully!');
        window.location.href = `/celebrity/${result.id}`;
      } else {
        alert('Failed to create profile. Please try again.');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join CelebNetwork
          </h1>
          <p className="text-xl text-gray-600">
            Create your celebrity profile with AI-powered assistance
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: AI Introduction */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <SparklesIcon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI-Powered Profile Creation
              </h2>
              <p className="text-gray-600">
                Tell us about yourself in one line and let our AI fill in the details
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                One-line Introduction *
              </label>
              <textarea
                value={formData.oneLineIntro}
                onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
                placeholder="e.g., 'Punjabi Singer from India who performed at Coachella' or 'Hollywood actor known for dramatic roles' or 'Motivational speaker inspiring millions worldwide'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
              />
              
              <button
                onClick={handleAIAutofill}
                disabled={isAIProcessing || !formData.oneLineIntro.trim()}
                className="w-full mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isAIProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5" />
                    Generate Profile with AI
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Profile Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Profile Details
              </h2>
              <p className="text-gray-600">
                Review and edit the AI-generated information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Basic Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre/Specialty
                  </label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Pop/Rock, Comedy, Drama"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fanbase (Number of followers) *
                  </label>
                  <input
                    type="number"
                    value={formData.fanbase}
                    onChange={(e) => handleInputChange('fanbase', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 1000000"
                    min="1000"
                    required
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Social Media
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@username or URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube
                  </label>
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@channelname or URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spotify
                  </label>
                  <input
                    type="text"
                    value={formData.spotify}
                    onChange={(e) => handleInputChange('spotify', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Artist name or URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@username or URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievements
                  </label>
                  <textarea
                    value={formData.achievements.join(', ')}
                    onChange={(e) => handleInputChange('achievements', e.target.value.split(', '))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Awards, recognitions (separate with commas)"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell your story..."
                rows={5}
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Review & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review Your Profile
              </h2>
              <p className="text-gray-600">
                Please review all information before submitting
              </p>
            </div>

            {/* Profile Preview */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{formData.name}</h3>
                  <p className="text-purple-600 font-semibold mb-1">{formData.category}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {formData.country}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <StarIcon className="h-4 w-4 mr-1" />
                    {Number(formData.fanbase).toLocaleString()} followers
                  </div>
                </div>
              </div>

              {formData.bio && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Biography</h4>
                  <p className="text-gray-700">{formData.bio}</p>
                </div>
              )}

              {formData.achievements.filter(a => a.trim()).length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.achievements.filter(a => a.trim()).map((achievement, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {achievement.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {formData.instagram && (
                    <div>
                      <span className="font-medium">Instagram:</span> {formData.instagram}
                    </div>
                  )}
                  {formData.youtube && (
                    <div>
                      <span className="font-medium">YouTube:</span> {formData.youtube}
                    </div>
                  )}
                  {formData.spotify && (
                    <div>
                      <span className="font-medium">Spotify:</span> {formData.spotify}
                    </div>
                  )}
                  {formData.twitter && (
                    <div>
                      <span className="font-medium">Twitter:</span> {formData.twitter}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Create Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}