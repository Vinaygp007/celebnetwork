'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon,
  EnvelopeIcon,
  StarIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon,
  CalendarIcon,
  GlobeAltIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { authApi, apiUtils } from '@/lib/api';

export default function FanSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const countries = [
    'United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 3) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
    if (!validateStep(3)) return;

    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await authApi.register({
        email: formData.email,
        password: formData.password,
        role: 'fan',
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        location: formData.country,
      });

      // Successfully registered
      console.log('Signup successful:', response.user);
      
      // Redirect to fan dashboard
      router.push('/dashboard/fan');
    } catch (err) {
      console.error('Signup error:', err);
      setApiError(apiUtils.formatError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <StarIcon className="h-12 w-12 text-purple-400 mr-3 animate-pulse" />
              <span className="text-3xl font-bold text-white">CelebNetwork</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6 animate-fade-in">
              Join the <span className="text-purple-400">Fan Community!</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 animate-slide-up">
              Create your account and start connecting with celebrities from around the world. Get exclusive access to content, events, and personal interactions.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 animate-slide-up animation-delay-1000">
              <div className="flex items-center text-gray-300">
                <HeartIcon className="h-5 w-5 text-pink-400 mr-3" />
                <span>Follow unlimited celebrities</span>
              </div>
              <div className="flex items-center text-gray-300">
                <SparklesIcon className="h-5 w-5 text-yellow-400 mr-3" />
                <span>Get personalized recommendations</span>
              </div>
              <div className="flex items-center text-gray-300">
                <UserIcon className="h-5 w-5 text-blue-400 mr-3" />
                <span>Join exclusive fan communities</span>
              </div>
              <div className="flex items-center text-gray-300">
                <GlobeAltIcon className="h-5 w-5 text-green-400 mr-3" />
                <span>Connect with fans worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <StarIcon className="h-8 w-8 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">CelebNetwork</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Join the Community!</h2>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 1 ? 'border-purple-400 bg-purple-400' : 'border-gray-500'
                  }`}>
                    {currentStep > 1 ? <CheckIcon className="h-4 w-4 text-white" /> : '1'}
                  </div>
                  <span className="ml-2 text-xs font-medium">Personal</span>
                </div>
                <div className={`w-6 h-0.5 ${currentStep >= 2 ? 'bg-purple-400' : 'bg-gray-500'}`}></div>
                <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 2 ? 'border-purple-400 bg-purple-400' : 'border-gray-500'
                  }`}>
                    {currentStep > 2 ? <CheckIcon className="h-4 w-4 text-white" /> : '2'}
                  </div>
                  <span className="ml-2 text-xs font-medium">Password</span>
                </div>
                <div className={`w-6 h-0.5 ${currentStep >= 3 ? 'bg-purple-400' : 'bg-gray-500'}`}></div>
                <div className={`flex items-center ${currentStep >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 3 ? 'border-purple-400 bg-purple-400' : 'border-gray-500'
                  }`}>
                    3
                  </div>
                  <span className="ml-2 text-xs font-medium">Complete</span>
                </div>
              </div>
            </div>

            {/* Signup Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-300">
                  {currentStep === 1 ? 'Tell us about yourself' : 
                   currentStep === 2 ? 'Create a secure password' : 
                   'Complete your account setup'}
                </p>
              </div>

              <form onSubmit={currentStep === 3 ? handleSignup : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                {/* API Error Display */}
                {apiError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-300 text-sm">{apiError}</p>
                    </div>
                  </div>
                )}

                {currentStep === 1 ? (
                  <>
                    {/* Step 1: Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                              errors.firstName ? 'border-red-500' : 'border-white/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                              errors.lastName ? 'border-red-500' : 'border-white/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                            errors.email ? 'border-red-500' : 'border-white/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                            errors.phone ? 'border-red-500' : 'border-white/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      Continue
                    </button>
                  </>
                ) : currentStep === 2 ? (
                  <>
                    {/* Step 2: Password Setup */}
                    <div className="text-center mb-6">
                      <LockClosedIcon className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-xl font-semibold text-white mb-2">Secure Your Account</h3>
                      <p className="text-gray-300 text-sm">Create a strong password to protect your account and personal information.</p>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Create Password
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                            errors.password ? 'border-red-500' : 'border-white/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="mt-3 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm font-medium text-gray-300 mb-3">Password Requirements:</div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className={`flex items-center transition-colors duration-300 ${
                            formData.password.length >= 8 ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 transition-colors duration-300 ${
                              formData.password.length >= 8 ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            8+ characters
                          </div>
                          <div className={`flex items-center transition-colors duration-300 ${
                            /[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 transition-colors duration-300 ${
                              /[A-Z]/.test(formData.password) ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            Uppercase letter
                          </div>
                          <div className={`flex items-center transition-colors duration-300 ${
                            /[a-z]/.test(formData.password) ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 transition-colors duration-300 ${
                              /[a-z]/.test(formData.password) ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            Lowercase letter
                          </div>
                          <div className={`flex items-center transition-colors duration-300 ${
                            /[0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 transition-colors duration-300 ${
                              /[0-9]/.test(formData.password) ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            Number
                          </div>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Password Strength</span>
                            <span>
                              {formData.password.length === 0 ? '' :
                               [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                 .filter(Boolean).length <= 1 ? 'Weak' :
                               [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                 .filter(Boolean).length <= 2 ? 'Fair' :
                               [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                 .filter(Boolean).length <= 3 ? 'Good' : 'Strong'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                formData.password.length === 0 ? 'w-0' :
                                [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                  .filter(Boolean).length <= 1 ? 'w-1/4 bg-red-500' :
                                [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                  .filter(Boolean).length <= 2 ? 'w-2/4 bg-yellow-500' :
                                [formData.password.length >= 8, /[A-Z]/.test(formData.password), /[a-z]/.test(formData.password), /[0-9]/.test(formData.password)]
                                  .filter(Boolean).length <= 3 ? 'w-3/4 bg-blue-500' : 'w-full bg-green-500'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                            errors.confirmPassword ? 'border-red-500' : 
                            formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' :
                            'border-white/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      
                      {/* Password Match Indicator */}
                      {formData.confirmPassword && (
                        <div className={`mt-2 text-sm flex items-center ${
                          formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formData.password === formData.confirmPassword ? (
                            <>
                              <CheckIcon className="h-4 w-4 mr-2" />
                              Passwords match
                            </>
                          ) : (
                            <>
                              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                              Passwords do not match
                            </>
                          )}
                        </div>
                      )}
                      
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 3: Final Details */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Date of Birth */}
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                              errors.dateOfBirth ? 'border-red-500' : 'border-white/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300`}
                          />
                        </div>
                        {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
                      </div>

                      {/* Country */}
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                              errors.country ? 'border-red-500' : 'border-white/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300`}
                          >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                              <option key={country} value={country} className="bg-gray-800">
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded bg-white/10 border-white/20 mt-1"
                        />
                        <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-300">
                          I agree to the{' '}
                          <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.agreeToTerms && <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>}

                      <div className="flex items-start">
                        <input
                          id="agreeToMarketing"
                          name="agreeToMarketing"
                          type="checkbox"
                          checked={formData.agreeToMarketing}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded bg-white/10 border-white/20 mt-1"
                        />
                        <label htmlFor="agreeToMarketing" className="ml-3 block text-sm text-gray-300">
                          I want to receive marketing communications and updates about new features
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link
                    href="/auth/fan/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
