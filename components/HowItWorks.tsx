'use client';

import { useState } from 'react';
import { UserPlus, Search, Star, MessageCircle, Heart, Shield } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create your account as a fan or celebrity in just minutes",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    id: 2,
    title: "Discover",
    description: "Find your favorite celebrities and explore new talent",
    icon: Search,
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    id: 3,
    title: "Connect",
    description: "Follow celebrities and engage with exclusive content",
    icon: Star,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    id: 4,
    title: "Interact",
    description: "Send messages, get replies, and build meaningful connections",
    icon: MessageCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }
];

const features = [
  {
    title: "Verified Celebrities",
    description: "All celebrities are verified to ensure authentic connections",
    icon: Shield,
    color: "text-green-600"
  },
  {
    title: "Exclusive Content",
    description: "Access behind-the-scenes content and personal updates",
    icon: Star,
    color: "text-yellow-600"
  },
  {
    title: "Direct Messaging",
    description: "Send messages directly to your favorite celebrities",
    icon: MessageCircle,
    color: "text-purple-600"
  },
  {
    title: "Fan Community",
    description: "Connect with other fans and build lasting friendships",
    icon: Heart,
    color: "text-pink-600"
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CelebNetwork</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with your favorite celebrities in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeStep === step.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-pink-200 transform -translate-x-1/2 z-0"></div>
                )}

                {/* Step Card */}
                <div className={`relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  activeStep === step.id ? 'border-purple-300' : 'border-gray-100'
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose CelebNetwork?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of celebrity-fan interaction with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Connect?
          </h3>
          <p className="text-lg mb-8 text-purple-100">
            Join thousands of fans already connecting with their favorite celebrities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Join as Fan
            </button>
            <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-800 transition-colors border-2 border-purple-400">
              Join as Celebrity
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}