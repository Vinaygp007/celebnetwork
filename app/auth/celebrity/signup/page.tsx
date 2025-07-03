'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock,
  Mail,
  Star,
  Camera,
  Globe,
  Phone,
  Calendar,
  MapPin,
  Check,
  AlertTriangle,
  Upload,
  X
} from 'lucide-react';
import { authApi, apiUtils } from '@/lib/api';

export default function CelebritySignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    city: '',
    stageName: '',
    bio: '',
    industries: [] as string[],
    socialMedia: {
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: '',
      facebook: ''
    },
    password: '',
    confirmPassword: '',
    profilePicture: null as File | null,
    agreeToTerms: false,
    agreeToMarketing: false,
    agreeToVerification: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 
    'Germany', 'France', 'Japan', 'South Korea', 'Brazil', 'Mexico', 
    'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 
    'Finland', 'Switzerland', 'Other'
  ];

  const industryOptions = [
    'Music', 'Film & TV', 'Theater', 'Comedy', 'Sports', 'Fashion', 
    'Gaming', 'Social Media', 'Business', 'Politics', 'Art', 'Literature',
    'Science', 'Technology', 'Food & Cooking', 'Travel', 'Fitness', 'Beauty'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const platform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [platform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleIndustryChange = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image must be less than 5MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select an image file' }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      setErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profilePicture: null }));
    setPreviewImage(null);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 2) {
      if (!formData.stageName.trim()) newErrors.stageName = 'Stage name is required';
      if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
      else if (formData.bio.length < 50) newErrors.bio = 'Bio must be at least 50 characters';
      if (formData.industries.length === 0) newErrors.industries = 'Select at least one industry';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      if (!formData.agreeToVerification) newErrors.agreeToVerification = 'You must agree to the verification process';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError('');
    
    try {
      if (!validateStep(currentStep)) {
        return;
      }

      console.log('🔥 Celebrity signup data:', formData);

      // Prepare signup data
      const signupData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
        city: formData.city,
        stageName: formData.stageName,
        bio: formData.bio,
        industries: formData.industries,
        socialMedia: formData.socialMedia,
        agreeToMarketing: formData.agreeToMarketing
      };

      const response = await authApi.signupCelebrity(signupData);
      
      console.log('🔥 Celebrity signup successful:', response);
      
      // If there's a profile picture, upload it
      if (formData.profilePicture) {
        try {
          const formData2 = new FormData();
          formData2.append('profilePicture', formData.profilePicture);
          
          await fetch('/api/upload/profile-picture', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${response.accessToken}`,
            },
            body: formData2,
          });
        } catch (uploadError) {
          console.error('Profile picture upload failed:', uploadError);
          // Don't fail signup for image upload error
        }
      }

      // Show success message and redirect
      router.push('/auth/celebrity/welcome');
      
    } catch (err) {
      console.error('🔥 Celebrity signup error:', err);
      setApiError(apiUtils.formatError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <div className="mt-1 relative">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
              placeholder="John"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <div className="mt-1 relative">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
              placeholder="Doe"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
            placeholder="john@example.com"
          />
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <div className="mt-1 relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
              placeholder="+1 (555) 123-4567"
            />
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth *
          </label>
          <div className="mt-1 relative">
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
      >
        Continue to Profile
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="stageName" className="block text-sm font-medium text-gray-700">
          Stage Name / Professional Name *
        </label>
        <div className="mt-1 relative">
          <input
            id="stageName"
            name="stageName"
            type="text"
            required
            value={formData.stageName}
            onChange={handleInputChange}
            className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
              errors.stageName ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
            placeholder="Your stage name"
          />
          <Star className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.stageName && <p className="text-red-500 text-xs mt-1">{errors.stageName}</p>}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio / About You * (min 50 characters)
        </label>
        <div className="mt-1">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            required
            value={formData.bio}
            onChange={handleInputChange}
            className={`appearance-none relative block w-full px-3 py-2 border ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
            placeholder="Tell us about yourself, your achievements, and what makes you unique..."
          />
          <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
        </div>
        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industries * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {industryOptions.map(industry => (
            <label key={industry} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.industries.includes(industry)}
                onChange={() => handleIndustryChange(industry)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{industry}</span>
            </label>
          ))}
        </div>
        {errors.industries && <p className="text-red-500 text-xs mt-1">{errors.industries}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture (Optional)
        </label>
        <div className="flex items-center space-x-4">
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Profile preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-picture"
            />
            <label
              htmlFor="profile-picture"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </label>
            <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG</p>
          </div>
        </div>
        {errors.profilePicture && <p className="text-red-500 text-xs mt-1">{errors.profilePicture}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
        >
          Continue to Final Step
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country *
          </label>
          <div className="mt-1 relative">
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City (Optional)
          </label>
          <div className="mt-1 relative">
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white"
              placeholder="New York"
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Social Media Links (Optional)
        </label>
        <div className="space-y-2">
          {Object.entries(formData.socialMedia).map(([platform, value]) => (
            <div key={platform} className="flex items-center space-x-2">
              <span className="w-20 text-sm text-gray-600 capitalize">{platform}:</span>
              <input
                type="url"
                name={`socialMedia.${platform}`}
                value={value}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder={`https://${platform}.com/username`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password *
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
              placeholder="Create password"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <button
              type="button"
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password *
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white`}
              placeholder="Confirm password"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <button
              type="button"
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <Link href="/terms" className="text-purple-600 hover:text-purple-500">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

        <div className="flex items-center">
          <input
            id="agreeToVerification"
            name="agreeToVerification"
            type="checkbox"
            checked={formData.agreeToVerification}
            onChange={handleInputChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeToVerification" className="ml-2 block text-sm text-gray-900">
            I agree to the celebrity verification process and understand that my profile will be reviewed
          </label>
        </div>
        {errors.agreeToVerification && <p className="text-red-500 text-xs">{errors.agreeToVerification}</p>}

        <div className="flex items-center">
          <input
            id="agreeToMarketing"
            name="agreeToMarketing"
            type="checkbox"
            checked={formData.agreeToMarketing}
            onChange={handleInputChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeToMarketing" className="ml-2 block text-sm text-gray-900">
            I want to receive marketing communications and updates
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Celebrity Account'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join as a Celebrity
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your celebrity profile and connect with fans worldwide
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
              }`}>
                {currentStep > 1 ? <Check className="h-4 w-4 text-white" /> : <span className="text-white text-sm">1</span>}
              </div>
              <span className="ml-2 text-xs font-medium">Personal</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
              }`}>
                {currentStep > 2 ? <Check className="h-4 w-4 text-white" /> : <span className="text-white text-sm">2</span>}
              </div>
              <span className="ml-2 text-xs font-medium">Profile</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 3 ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
              }`}>
                <span className="text-white text-sm">3</span>
              </div>
              <span className="ml-2 text-xs font-medium">Complete</span>
            </div>
          </div>
        </div>

        <form onSubmit={currentStep === 3 ? handleSignup : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
          {/* API Error Display */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <div className="text-red-600 text-sm">
                  {apiError}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/celebrity/login" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}